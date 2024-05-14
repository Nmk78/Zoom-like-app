"use client";
import Meeting from "@/components/Meeting";
import { useGetCallById } from "@/hooks/useGetCallById";
import React from "react";
import MeetingLayout from "./layout";

const MeetingPage = ({ params }) => {
  const { call, isCallLoading } = useGetCallById(params.id);
  return (
    <MeetingLayout>
      {/* <div id="meeting"> */}
        <Meeting params={params} />
      {/* </div> */}
    </MeetingLayout>
  );
};

export default MeetingPage;

// "use client";
// import { useUser } from "@clerk/nextjs";
// import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
// import React, { useEffect, useState } from "react";
// import { useGetCallById } from "@/hooks/useGetCallById";
// import MeetingSetup from "@/components/MeetingSetup";

// const Meeting = ({ params }) => {

//     // console.log("🚀 ~ Meeting ~ id:", id)

//   const { user, isLoaded } = useUser();
//     const {call, callLoading} = useGetCallById(params?.id)
//     // const {call, callLoading} = useGetCallById(id)

//     console.log("🚀 ~ Meeting ~ call:", call)

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
// // console.log("🚀 ~ Meeting ~ call:", call)
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
// export default Meeting;
