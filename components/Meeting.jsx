"use client";
// import { Meeting } from "@/components/Meeting";
import { useUser } from "@clerk/nextjs";
import {
  DeviceSelectorAudioInput,
  DeviceSelectorVideo,
  DeviceSettings,
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import MeetingSetup from "./MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useParams } from "next/navigation";
import Loading from "./Loading";
import MeetingRoom from "./MeetingRoom";

const Meeting = ({ params }) => {
  const { id } = useParams();

  const {call, callLoading} = useGetCallById(id)

  console.log("🚀 ~ Meeting ~ call:", call);

  const [meetingReady, setMeetingReady] = useState(false);

  //   //// Same as custom hook useGetCallById
  //   const client = useStreamVideoClient();
  //   const [callLoading, setCallLoading] = useState(true);
  //   const [call, setCall] = useState();
  //   useEffect(() => {
  //     if (!client) return;

  //     const id = params?.id

  //     const getCall = async () => {
  //       const call = client.queryCalls({
  //         filter_conditions: {
  //           id,
  //         },
  //       });
  //       if (call.length > 0) {
  //         setCall(call[0]);
  //       }
  //       setCallLoading(false);
  //     };

  //     getCall();
  //   }, [client, params?.id]);
  // ///////
  // console.log("🚀 ~ Meeting ~ call:", call)

  if (!call) {
    if (!callLoading)
      return (
        <div className="w-full h-full text-center text-3xl font-bold text-white">
          <Loading />
        </div>
      );
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );
  }
  return (
    <div>
      <StreamCall call={call}>
        <StreamTheme>
          {!meetingReady ? (
            <MeetingSetup setMeetingReady={setMeetingReady} />
          ) : (
            <MeetingRoom/>
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  );
};
export default Meeting;
