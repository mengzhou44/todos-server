import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

export async function getAccessToken(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}
