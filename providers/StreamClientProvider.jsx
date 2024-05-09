"use client";

import Loading from "@/components/Loading";
import { tokenProvider } from "@/serverActions/stream";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const userId = "user-id";
const token = "authentication-token";
const user = { id: userId };

// const call = client.call("default", "my-first-call");
// call.join({ create: true });

const StreamVideoProvider = ({ children }) => {
  const [videoClient, setVideoClient] = useState();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API Key is missing");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.name,
        image: user?.imageUrl,
      },
      tokenProvider,
    });
    setVideoClient(client)
  }, [user, isLoaded]);

  if(!videoClient) {
    <Loading message="Video Loading"/>
  }
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;