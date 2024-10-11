import { prisma } from '@/utils/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, description, categoryId } = req.body;

        // Get the sessionId from cookies
        const sessionId = req.cookies.sessionId;
        
        if (!sessionId) {
            return res.status(401).json({ message: 'Unauthorized. No session found.' });
        }

        try {
            const session = await prisma.session.findUnique({
                where: { id: sessionId },
            });

            if (!session || !session.userId) {
                return res.status(401).json({ message: 'Invalid session or session expired.' });
            }

            const userId = session.userId;

            // Validate required fields
            if (!title || !description || !categoryId) {
                return res.status(400).json({ message: 'Title and description are required.' });
            }

            // Create new goal
            const newGoal = await prisma.goal.create({
                data: {
                    userId,
                    title,
                    description,
                    categoryId
                },
            });

            return res.status(201).json(newGoal);
        } catch (error) {
            console.error('Error creating goal:', error);
            return res.status(500).json({ message: 'Something went wrong while creating the goal.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
