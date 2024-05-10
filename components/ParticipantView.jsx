// // import { useCallStateHooks, ParticipantView } from '@stream-io/video-react-sdk';
// "use client"
// import { ParticipantView, useCallStateHooks } from "@stream-io/video-react-sdk";

// export const ParticipantViewUI = () => {
//   const { useParticipants } = useCallStateHooks();
//   const participants = useParticipants();
//   return (
//     <>
    
//       {participants.map((p) => (
//                 // console.log("🚀 ~ ParticipantViewUI ~ p:", p)
//         <ParticipantView participant={p} key={p.sessionId} />
//       ))}
//     </>
//   );
// };