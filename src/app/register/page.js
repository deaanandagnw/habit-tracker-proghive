'use server'

import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  async function registerUser(formData) {
    'use server'
    try {
      const username = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');

      if (!username || !email || !password) {
        throw new Error('All fields are required');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      redirect('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-xl bg-white">
            <h2 className="text-2xl font-bold text-center mb-3">Register</h2>
            <form action={registerUser} className="space-y-2">
            <div className="form-control">
                <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
                </label>
                <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="input input-bordered w-full"
                required
                />
            </div>

            <div className="form-control">
                <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
                </label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
                />
            </div>

            <div className="form-control">
                <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
                </label>
                <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
                />
            </div>

            <div className="form-control mt-[5rem]">
                <button type="submit" className="btn btn-primary text-white w-full">Register</button>
            </div>
            </form>
        </div>
    </div>
  );
}
