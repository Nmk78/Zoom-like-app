// "use client";
// // import { Meeting } from "@/components/Meeting";
// import { useUser } from "@clerk/nextjs";
// import {
//   DeviceSelectorAudioInput,
//   DeviceSelectorVideo,
//   DeviceSettings,
//   StreamCall,
//   StreamTheme,
//   useStreamVideoClient,
// } from "@stream-io/video-react-sdk";
// import React, { useEffect, useState } from "react";
// import MeetingSetup from "./MeetingSetup";
// import { useGetCallById } from "@/hooks/useGetCallById";
// import { useParams } from "next/navigation";
// import Loading from "./Loading";
// import MeetingRoom from "./MeetingRoom";
// import Link from "next/link";

// const Meeting = ({ params }) => {
//   const { id } = useParams();

//   const { call, callLoading } = useGetCallById(id);
//   console.log("🚀 ~ //useEffect ~ callLoading:", callLoading)

//   console.log("🚀 ~ Meeting ~ call:", call);

//   const [meetingReady, setMeetingReady] = useState(false);

//   //   //// Same as custom hook useGetCallById
//   //   const client = useStreamVideoClient();
//   //   const [callLoading, setCallLoading] = useState(true);
//   //   const [call, setCall] = useState();
//   //   useEffect(() => {
//   //     if (!client) return;

//   //     const id = params?.id

//   //     const getCall = async () => {
//   //       const call = client.queryCalls({
//   //         filter_conditions: {
//   //           id,
//   //         },
//   //       });
//   //       if (call.length > 0) {
//   //         setCall(call[0]);
//   //       }
//   //       setCallLoading(false);
//   //     };

//   //     getCall();
//   //   }, [client, params?.id]);
//   // ///////
//   // console.log("🚀 ~ Meeting ~ call:", call)

//   // useEffect(()=>{
//     if (!call) {
//       if (callLoading) {
//         return (
//           <div className="w-full h-full text-center text-3xl font-bold text-white">
//             <Loading />
//           </div>
//         );
//       }
//       return (
//         <div className="flex flex-col justify-center items-center">
//           <p className="text-center text-3xl font-bold text-white">
//             Call Not Found!
//           </p>
//           <Link href="/" className=" mt-2 font-semibold underline">Back</Link>
//         </div>
//       );
//     }
//   // }, [call, callLoading])

//   return (
//     <div>
//       <StreamCall call={call}>
//         <StreamTheme>
//           {!meetingReady ? (
//             <MeetingSetup setMeetingReady={setMeetingReady} />
//           ) : (
//             <MeetingRoom />
//           )}
//         </StreamTheme>
//       </StreamCall>
//     </div>
//   );
// };
// export default Meeting;


"use client";
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
import Link from "next/link";

const Meeting = ({ params }) => {
  const { id } = useParams();
  const { call, callLoading } = useGetCallById(id);
  const [meetingReady, setMeetingReady] = useState(false);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ callLoading:", callLoading);
    console.log("🚀 ~ useEffect ~ call:", call);
  }, [call, callLoading]);

  if (callLoading) {
    return (
      <div className="w-full h-full text-center text-3xl font-bold text-white">
        <Loading />
      </div>
    );
  }

  if (!call) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-center text-3xl font-bold text-white">
          Call Not Found!
        </p>
        <Link href="/" className=" mt-2 font-semibold underline">Back</Link>
      </div>
    );
  }

  return (
    <div>
      <StreamCall call={call}>
        <StreamTheme>
          {!meetingReady ? (
            <MeetingSetup setMeetingReady={setMeetingReady} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  );
};

export default Meeting;
