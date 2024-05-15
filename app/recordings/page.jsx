"use client";

import Loading from "@/components/Loading";
import MeetingCard from "@/components/MeetingCard";
import { useGetCallById } from "@/hooks/useGetCallById";
import useGetCallsByUser, { useGetCalls } from "@/hooks/useGetCallsByUser";
import React, { useEffect, useState } from "react";

const Recordings = () => {
  const { recordings, isLoading } = useGetCallsByUser();
  // console.log("🚀 ~ Recordings ~ recordings:", recordings);
  const [recordingData, setRecordingData] = useState([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        recordings?.map((meeting) => meeting.queryRecordings()) ?? []
      );
      // const callData = await recordings[0].queryRecordings() ?? []
      console.log("🚀 ~ fetchRecordings ~ callData:", callData)
      const filteredRecordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordingData(filteredRecordings);
    };

    fetchRecordings();
  }, [recordings]);
  console.log("🚀 ~ Recordings ~ recordingData:", recordingData);

  return (
    <div className="p-3 w-full h-full overflow-y-scroll">
      <div className="font-bold text-4xl my-[30px]">Meeting Records</div>
      <div
        id="meetingRecordCardContainer"
        className="w-full mx-auto h-auto flex flex-wrap items-center content-start justify-start"
      >
        {isLoading && <Loading />}
        {recordingData && (
          recordingData.map((record, index)=>{
            // console.log(record)
            return (<MeetingCard key={index} title={record.filename.slice(0,25)}  code={record.url} start={record.start_time.toLocaleString()} end={record.end_time.toLocaleString()} type="recording"/>)
          })
        )}
      </div>
    </div>
  );
};

export default Recordings;
