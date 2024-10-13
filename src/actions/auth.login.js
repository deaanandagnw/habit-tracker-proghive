"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const res = await fetch("/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        const data = await res.json();

        // Set session ID in cookies (server-side)
        cookies().set("sessionId", data.sessionId);

        // Redirect to dashboard
        redirect("/dashboard");
    } catch (error) {
        console.error("Login error:", error.message);
        throw new Error("Login failed");
    }
}