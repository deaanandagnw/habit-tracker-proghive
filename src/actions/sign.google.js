"use server";

import { generateState, generateCodeVerifier } from "arctic";
import { google } from "@/utils/arctic";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginWithGoogle() {
    // Generate state & codeVerifier
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    // ! Code challenge
    cookies().set("codeVerifier", codeVerifier);

    // url authorization
    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"],
    });

    // redirect user to Google URL authorization
    redirect(url.href);
}