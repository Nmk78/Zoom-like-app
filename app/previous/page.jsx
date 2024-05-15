"use client";

import Loading from "@/components/Loading";
import MeetingCard from "@/components/MeetingCard";
import { useGetCallById } from "@/hooks/useGetCallById";
import useGetCallsByUser, { useGetCalls } from "@/hooks/useGetCallsByUser";
import React from "react";

const PreviousMeetings = () => {
  const { previousCalls, isLoading } = useGetCallsByUser();
  console.log("🚀 ~ PreviousMeetings ~ previousCalls:", previousCalls);
  return (
    <div className="p-3 w-full h-full overflow-y-scroll">
      {/* <MeetingCard /> */}
      <div className="font-bold text-4xl my-[30px]">Previous Meetings</div>
      <div id="meetingCardContainer" className="w-full mx-auto h-auto flex flex-wrap items-center content-start justify-start">
        {isLoading && <Loading/>}
        {previousCalls && previousCalls.length > 0 ? (
  previousCalls.map((calls, index) => {
    console.log("🚀 ~ previousCalls.map ~ calls:", calls?.state?.startsAt);
    return (
      <MeetingCard
        key={index}
        title={calls?.state?.custom?.title || "Instant meeting"}
        description={calls?.state?.custom?.description || "No description"}
        date={calls?.state?.startsAt ? new Date(calls.state.startsAt).toLocaleString() : "unknown-date"}
        type="ended-calls"
      />
    );
  })
) : !isLoading ? (
  <div className="absolute top-1/2 left-1/2">No previous Meetings</div>
) : (
  ""
)}

      </div>
    </div>
  );};

export default PreviousMeetings;
