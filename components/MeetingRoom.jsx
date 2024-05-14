"use client";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantListing,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faPeopleGroup,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { LayoutList } from "lucide-react";
import { Button } from "./ui/button";
import Modal from "./Modal";

const MeetingRoom = () => {
  //   this should be either grid | participants-left | partivipants-right
  const [layout, setLayout] = useState("grid");
  const [showParticipants, setShowParticipants] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const router = useRouter();
  const call = useCall();
  const searchParams = useSearchParams();
  const { useCallCallingState } = useCallStateHooks();

  const CallingState = useCallCallingState();

  const roomOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;
  // console.log("🚀 ~ MeetingRoom ~ roomOwner:", roomOwner);

  const CALLING_STATE_TO_LABEL = {
    [CallingState.JOINING]: "Joining",
    [CallingState.RINGING]: "Ringing",
    [CallingState.RECONNECTING]: "Re-connecting",
    [CallingState.RECONNECTING_FAILED]: "Failed",
    [CallingState.OFFLINE]: "No internet connection",
    [CallingState.IDLE]: "Idle",
    [CallingState.UNKNOWN]: "Unknown error!",
    [CallingState.JOINED]: "Joined",
    [CallingState.LEFT]: "Left call",
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

  useEffect(() => {
    if (CallingState == "left") {
      router.push("/");
    }
  }, [CallingState, router]);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center overflow-hidden py-4 px-2">
      <Modal
        isOpen={modalOpen}
        title="End call for everyone?"
        buttonLabel="End"
        type="endCall"
        onClose={() => setModalOpen(false)}
      />

      <div
        id="videoPanel"
        className="w-full h-full min-h-[90vh] flex flex-col items-center justify-center"
      >
        {CallingState !== "joined" ? (
          <p className="capitalize font-bold text-xl">
            {/* {CALLING_STATE_TO_LABEL[CallingState] || "Joining..."} */}
            {CallingState}
          </p>
        ) : (
          <SelectedLayout />
        )}
      </div>
      <div
        className={cn(
          " hidden absolute bottom-[10vh] right-10 bg-[#19232d] z-40 backdrop-blur-sm px-3 py-5 rounded-2xl",
          { " block": showParticipants }
        )}
      >
        <CallParticipantsList
          onClose={() => {
            setShowParticipants(false);
          }}
        />
      </div>
      <div
        id="controls"
        className="flex items-center gap-4 flex-wrap justify-center mb-10"
      >
        {/* {CallingState !== "joined" && (
          <p className=" capitalize font-bold text-xl">
            {CALLING_STATE_TO_LABEL[CallingState]}
          </p>
        )} */}

        <CallControls
          onLeave={() => {
            console.log("leaved");
            router.push("/");
          }}
        />
        <div className="flex h-16 mb-0 justify-center items-center">
          {" "}
          {roomOwner && (
            <Button
              variant="destructive"
              className="rounded-3xl"
              onClick={() => setModalOpen(!modalOpen)}
            >
              End call for everyone
            </Button>
          )}
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-3xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
                <Image
                  src="/icons/gridView.svg"
                  width={25}
                  height={75}
                  alt="Menu"
                />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 bg-[#19232d] text-white">
              {["Grid", "Participants-Left", "Participants-Right"].map(
                (item, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      onClick={() => setLayout(item.toLowerCase())}
                    >
                      {item}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-dark-1" />
                  </div>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="bg-[#19232d] hover:bg-[#4c535b] rounded-3xl"
            onClick={() => {
              setShowParticipants(!showParticipants);
            }}
          >
            {" "}
            <FontAwesomeIcon
              icon={faUsersViewfinder}
              size="xl"
              color="#eaeaea"
            />
          </Button>
        </div>
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
