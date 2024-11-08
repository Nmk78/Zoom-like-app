"use client"
import Meeting from "@/components/Meeting";
import React from "react";
import MeetingLayout from "./layout";
import { useGetCallById } from "@/hooks/useGetCallById";
import Head from "next/head";

const MeetingPage = ({ params }) => {
  const { call, isCallLoading } = useGetCallById(params.id);

  const title = call?.streamClient?.user?.name
    ? `${call.streamClient.user.name} created a meeting`
    : "Join the meeting";
  const description = "Join the live meeting with real-time video and collaboration.";
  const ogImage = "/og.png";

  return (
    <MeetingLayout>
      {/* Conditional Head for dynamic metadata */}
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:card" content="summary_large_image" />
      </Head>

      <Meeting params={params} />
    </MeetingLayout>
  );
};

export default MeetingPage;
