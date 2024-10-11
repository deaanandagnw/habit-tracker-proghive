import { prisma } from '@/utils/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, author, description} = req.body;

        // Get the sessionId from cookies (use req.cookies, not Cookies from js-cookie)
        const sessionId = req.cookies.sessionId;
        
        if (!sessionId) {
            return res.status(401).json({ message: 'Unauthorized. No session found.' });
        }

        try {
            // Fetch the session to get userId
            const findUser = await prisma.user.findFirst({
                where: {
                  email: userData.email,
                },
              });

            if (!findUser) {
                return res.status(401).json({ message: 'Invalid session.' });
            }

            const id = sessionId.userId;
            
            // Validate required fields
            if (!author || !title || !description) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Create new goal
            const newGoal = await prisma.goal.create({
                data: {
                    id,
                    title,
                    description,
                    userId,
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
