"use client";
import MeetingCard from "@/components/MeetingCard";
import useGetCallsByUser from "@/hooks/useGetCallsByUser";
import React from "react";

const ScheduledPage = () => {
  const { scheduled } = useGetCallsByUser();
  console.log("🚀 ~ scheduled ~ callList:", scheduled?.title);
  return (
    <div className="p-3">
      <MeetingCard />
      <div>Scheduled Meeting</div>
      {scheduled ? (
        scheduled.map(() => {
          <MeetingCard title="a" />;
        })
      ) : (
        <div>No Scheduled Meetings</div>
      )}
    </div>
  );
};

export default ScheduledPage;
