import { Google } from "arctic";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleSecretKey = process.env.GOOGLE_CLIENT_SECRET;
const googleRedirectURI = process.env.GOOGLE_REDIRECT_URI;

export const google = new Google(googleClientId, googleSecretKey, googleRedirectURI);