
"use client";
import { loginWithGoogle } from "@/actions/sign.google";

import { useState } from "react";
import Cookies from "js-cookie"; // hanya jalan di client component
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      Cookies.set("sessionId", data.sessionId);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="container mx-auto bg-white ">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-md p-8">
            <div className="flex flex-col w-full text-center bg-white rounded-3xl">
              <h3 className="mb-4 text-4xl font-extrabold text-gray-900">Log In</h3>
              <p className="mb-6 text-gray-700">Enter your email and password</p>

              {/* Email Input */}
              <label htmlFor="email" className="text-sm font-medium text-gray-900 mb-2 text-left">
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mb-4 text-sm text-gray-900 bg-gray-200 rounded-2xl placeholder-gray-600 focus:outline-none focus:bg-gray-300"
              />

              {/* Password Input */}
              <label htmlFor="password" className="text-sm font-medium text-gray-900 mb-2 text-left">
                Password*
              </label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 mb-5 text-sm text-gray-900 bg-gray-200 rounded-2xl placeholder-gray-600 focus:outline-none focus:bg-gray-300"
              />

              {/* Submit Button */}
              <button onClick={handleLogin} className="w-full py-3 text-sm font-bold text-white bg-blue-500 rounded-2xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
                Log In
              </button>

              {/* Google Sign In */}
              <form action={loginWithGoogle}>
              <button className="flex items-center justify-center w-full py-3 mt-3 mb-6 text-sm font-medium transition bg-gray-300 rounded-2xl text-gray-900 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300">
                <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="Google Logo" />
                Sign in with Google
              </button>
              </form>

            </div>

              {/* Register Link */}
              <p className="mt-4 text-sm text-gray-900 text-center">
                Don't have account?
                <a href="register" className="font-bold text-blue-500 hover:underline">
                  Register
                </a>
              </p>
          </div>
        </div>
      </div>
    </main>
  );
}
