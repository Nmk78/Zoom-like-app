"use client";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantListing,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MeetingRoom = () => {

  const [layout, setLayout] = useState("grid");
  //   this should be either grid | participants-left | partivipants-right
  const [showParticipants, setShowParticipants] = useState(false);

  const router = useRouter()

  const { useCallCallingState } = useCallStateHooks();
  const CallingState = useCallCallingState();

  const CALLING_STATE_TO_LABEL = {
    [CallingState.JOINING]: 'Joining',
    [CallingState.RINGING]: 'Ringing',
    [CallingState.RECONNECTING]: 'Re-connecting',
    [CallingState.RECONNECTING_FAILED]: 'Failed',
    [CallingState.OFFLINE]: 'No internet connection',
    [CallingState.IDLE]: 'Idle',
    [CallingState.UNKNOWN]: 'Unknown error!',
    [CallingState.JOINED]: 'Joined',
    [CallingState.LEFT]: 'Left call',
  };

  const SelectedLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "participants-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "participants-right":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <PaginatedGridLayout />;
    }
  };

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center overflow-hidden py-4 px-2">
      <div
        id="videoPanel"
        className="w-full h-full min-h-[90vh] flex flex-col items-center justify-center"
      >
        {CallingState != "joined" ? <p className=" capitalize font-bold text-xl">{CALLING_STATE_TO_LABEL[CallingState]}</p> : <SelectedLayout />}

        
      </div>
      <div className={cn(" hidden ", { " block": showParticipants })}>
        <CallParticipantsList
          onClose={() => {
            setShowParticipants(false);
          }}
        />
      </div>
      <div id="controls">
        <CallControls onLeave={() => router.push(`/`)} />
      </div>
    </section>
  );
};

export default MeetingRoom;

// 'use client';
// import { useState } from 'react';
// import {
//   CallControls,
//   CallParticipantsList,
//   CallStatsButton,
//   CallingState,
//   PaginatedGridLayout,
//   SpeakerLayout,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Users, LayoutList } from 'lucide-react';

// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from './ui/dropdown-menu';
// import Loading from './Loading';
// // import EndCallButton from './EndCallButton';
// import { cn } from '@/lib/utils';

// const MeetingRoom = () => {
//   const searchParams = useSearchParams();
//   const isPersonalRoom = !!searchParams.get('personal');
//   const router = useRouter();
//   const [layout, setLayout] = useState('speaker-left');
//   const [showParticipants, setShowParticipants] = useState(false);
//   const { useCallCallingState } = useCallStateHooks();

//   // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
//   const callingState = useCallCallingState();
//   console.log("🚀 ~ MeetingRoom ~ callingState:", callingState)

// //   if (callingState !== CallingState.JOINED) return <Loading />;

//   const CallLayout = () => {
//     console.log("Layout = ",layout)
//     switch (layout) {
//       case 'grid':
//         return <PaginatedGridLayout />;
//       case 'speaker-right':
//         return <SpeakerLayout participantsBarPosition="left" />;
//       default:
//         return <SpeakerLayout participantsBarPosition="right" />;
//     }
//   };

//   return (
//     <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
//       <div className="relative flex size-full items-center justify-center">
//         <div className=" flex size-full max-w-[1000px] items-center">
//             <p>Meeting Room </p>
//             <br />
//             <br />
//             <p>Calling State { callingState}</p>
//           <CallLayout />
//         </div>
//         <div
//           className={cn('h-[calc(100vh-86px)] hidden ml-2', {
//             'show-block': showParticipants,
//           })}
//         >
//           <CallParticipantsList onClose={() => setShowParticipants(false)} />
//         </div>
//       </div>
//       {/* video layout and call controls */}
//       <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
//         <CallControls onLeave={() => router.push(`/`)} />
// {/*
//         <DropdownMenu>
//           <div className="flex items-center">
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
//               <LayoutList size={20} className="text-white" />
//             </DropdownMenuTrigger>
//           </div>
//           <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//             {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
//               <div key={index}>
//                 <DropdownMenuItem
//                   onClick={() =>
//                     setLayout(item.toLowerCase())
//                   }
//                 >
//                   {item}
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator className="border-dark-1" />
//               </div>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu> */}
//         <CallStatsButton />
//         <button onClick={() => setShowParticipants((prev) => !prev)}>
//           <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
//             <Users size={20} className="text-white" />
//           </div>
//         </button>
//         {/* {!isPersonalRoom && <EndCallButton />} */}
//       </div>
//     </section>
//   );
// };

// export default MeetingRoom;
