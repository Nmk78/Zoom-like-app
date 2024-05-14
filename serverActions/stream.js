"use server";

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const streamSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser(); /// Clerk way to get user in server side
  // console.log("🚀 ~ tokenProvider ~ user:", user)

  if (!user){ throw new Error("Unauthenticated to create token")};
  if (!apiKey) throw new Error("API key is missing");
  if (!streamSecret) throw new Error("Stream secret is missing");

  const client = new StreamClient(apiKey, streamSecret, { timeout: 10000 });
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const createdAt = Math.floor(Date.now() / 1000) - 60;

  const token = client.createToken(user.id, exp, createdAt);

  return token;
};
