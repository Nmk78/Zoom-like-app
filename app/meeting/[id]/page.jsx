
"use client"
import MeetingRoom from '@/components/Meeting';
import { useGetCallById } from '@/hooks/useGetCallById';
import React from 'react'

const Meeting = ({params}) => {
  const { call, isCallLoading } = useGetCallById(params.id);
  console.log("🚀 ~ Meeting ~ call:", call)
  return (
    <div><MeetingRoom params={params}/></div>
  )
}

export default Meeting

// "use client";
// import { useUser } from "@clerk/nextjs";
// import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
// import React, { useEffect, useState } from "react";
// import { useGetCallById } from "@/hooks/useGetCallById";
// import MeetingSetup from "@/components/MeetingSetup";


// const MeetingRoom = ({ params }) => {

//     // console.log("🚀 ~ MeetingRoom ~ id:", id)

//   const { user, isLoaded } = useUser();
//     const {call, callLoading} = useGetCallById(params?.id)
//     // const {call, callLoading} = useGetCallById(id)
    
//     console.log("🚀 ~ MeetingRoom ~ call:", call)

//   const [meetingReady, setMeetingReady] = useState(false);

// //   //// Same as custom hook useGetCallById
// //   const client = useStreamVideoClient();
// //   const [callLoading, setCallLoading] = useState(true);
// //   const [call, setCall] = useState();
// //   useEffect(() => {
// //     if (!client) return;

// //     const id = params?.id

// //     const getCall = async () => {
// //       const call = client.queryCalls({
// //         filter_conditions: {
// //           id,
// //         },
// //       });
// //       if (call.length > 0) {
// //         setCall(call[0]);
// //       }
// //       setCallLoading(false);
// //     };

// //     getCall();
// //   }, [client, params?.id]);
// // ///////
// // console.log("🚀 ~ MeetingRoom ~ call:", call)
// if (!call) return (
//   <p className="text-center text-3xl font-bold text-white">
//     Call Not Found
//   </p>
// );
//   return (
//     <div>
//       <StreamCall call={call}>
//         <StreamTheme>
//           {!meetingReady ? <MeetingSetup /> : "Meeting Room"}
//         </StreamTheme>
//       </StreamCall>
//     </div>
//   );
// };
// export default MeetingRoom;
