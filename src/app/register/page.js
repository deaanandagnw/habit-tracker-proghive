"use client"; // Mark this component as a client component to use hooks

import { useState } from "react"; // Import useState for managing state
import { handleRegister } from "@/actions/auth.register";

export default function Home() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [username, setUsername] = useState(""); // State for name input
  const [errors, setErrors] = useState({}); // State for error messages

  const validateForm = () => {
    const newErrors = {};
    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    // Set errors if any
    setErrors(newErrors);
    
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate form inputs
    if (!validateForm()) {
      return; // Stop submission if there are validation errors
    }

    // Prepare formData to send
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // Call handleRegister if validation passes
    await handleRegister(formData);
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="container mx-auto bg-white">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-md p-8">
            <div className="flex flex-col w-full bg-white rounded-3xl">
              <h3 className="mb-4 text-4xl font-extrabold text-gray-900 text-center">Register</h3>
              <p className="mb-6 text-gray-700 text-center">Fill in your details to create an account</p>

              {/* Form */}
              <form onSubmit={onSubmit}>
                {/* username Input */}
                <div className="flex flex-col mb-4">
                  <label htmlFor="username" className="text-sm font-medium text-gray-900 mb-2">
                    Name*
                  </label>
                  <input
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 text-sm text-gray-900 bg-gray-200 rounded-2xl placeholder-gray-600 focus:outline-none focus:bg-gray-300`}
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col mb-4">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900 mb-2">
                    Email*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 text-sm text-gray-900 bg-gray-200 rounded-2xl placeholder-gray-600 focus:outline-none focus:bg-gray-300`}
                  />
                  {/* Error Message */}
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Password Input */}
                <div className="flex flex-col mb-5">
                  <label htmlFor="password" className="text-sm font-medium text-gray-900 mb-2">
                    Password*
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 text-sm text-gray-900 bg-gray-200 rounded-2xl placeholder-gray-600 focus:outline-none focus:bg-gray-300`}
                  />
                  {/* Error Message */}
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Submit Button */}
                <button className="w-full py-3 text-sm font-bold text-white bg-blue-500 rounded-2xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
                  Register
                </button>
              </form>
            </div>

            {/* Login Link */}
            <p className="mt-4 text-sm text-gray-900 text-center">
              Already have an account?
              <a href="login" className="font-bold text-blue-500 hover:underline">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
