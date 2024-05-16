"use client";

import Loading from "@/components/Loading";
import MeetingCard from "@/components/MeetingCard";
import { useGetCallById } from "@/hooks/useGetCallById";
import useGetCallsByUser, { useGetCalls } from "@/hooks/useGetCallsByUser";
import React, { useEffect, useState } from "react";

const Recordings = () => {
  const { recordings, isLoading } = useGetCallsByUser();
  const [recordingData, setRecordingData] = useState([]);
  const startDateOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const endDateOptions = { hour: "numeric", minute: "numeric", hour12: true };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        recordings?.map((meeting) => meeting.queryRecordings()) ?? []
      );
      // const callData = await recordings[0].queryRecordings() ?? []
      const filteredRecordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordingData(filteredRecordings);
    };

    fetchRecordings();
  }, [recordings]);
  return (
    <div className="p-3 w-full h-full overflow-y-scroll">
      <div className="font-bold text-4xl my-[30px]">Meeting Records</div>
      <div
        id="meetingRecordCardContainer"
        className="w-full mx-auto h-auto flex flex-wrap items-center content-start justify-start"
      >
        {isLoading && <Loading />}
        {recordingData &&
          recordingData.map((record, index) => {
            const startTime = new Date(record.start_time);
            const endTime = new Date(record.end_time);
            return (
              <MeetingCard
                key={index}
                title={record.filename.slice(0, 25)}
                code={record.url}
                start={startTime.toLocaleString(undefined, startDateOptions)}
                end={endTime.toLocaleString(undefined, endDateOptions)}
                type="recording"
              />
            );
          })}
      </div>
    </div>
  );
};

export default Recordings;
