"use client";
import { useCallback, useMemo, useState } from "react";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  useCall,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import { Users, LayoutList } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
import Loading from "./Loading";
// import EndCallButton from './EndCallButton';
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

// const MeetingRoom = () => {
//   const searchParams = useSearchParams();
//   const isPersonalRoom = !!searchParams.get("personal");
//   const router = useRouter();
//   const [layout, setLayout] = useState("speaker-left");
//   const [showParticipants, setShowParticipants] = useState(false);

//   const { useCallCallingState, useLocalParticipant } = useCallStateHooks();

//   // Always call hooks
//   const callingState = useCallCallingState();
//   const localParticipant = useLocalParticipant();
//     const call = useCall();

//   // Perform conditional rendering after calling all hooks
//   if (callingState !== CallingState.JOINED) {
//     return <Loading />;
//   }

// const handleLayoutChange = (newLayout) => {
//   if (layout !== newLayout) {
//     setLayout(newLayout);
//   }
// };

//   const roomOwner =
//     localParticipant &&
//     call?.state.createdBy &&
//     localParticipant.userId === call.state.createdBy.id;

//   // console.log("🚀 ~ MeetingRoom ~ roomOwner:", roomOwner);
//   const CALLING_STATE_TO_LABEL = {
//     [CallingState.JOINING]: "Joining",
//     [CallingState.RINGING]: "Ringing",
//     [CallingState.RECONNECTING]: "Re-connecting",
//     [CallingState.RECONNECTING_FAILED]: "Failed",
//     [CallingState.OFFLINE]: "No internet connection",
//     [CallingState.IDLE]: "Idle",
//     [CallingState.UNKNOWN]: "Unknown error!",
//     [CallingState.JOINED]: "Joined",
//     [CallingState.LEFT]: "Left call",
//   };

//   const CallLayout = () => {
//     console.log("Layout = ", layout);
//     switch (layout) {
//       case "grid":
//         return <PaginatedGridLayout />;
//       case "speaker-right":
//         return <SpeakerLayout participantsBarPosition="left" />;
//       default:
//         return <SpeakerLayout participantsBarPosition="right" />;
//     }
//   };

//   return (
//     <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
//       <div className="relative flex size-full items-center justify-center">
//         <div className=" flex size-full max-w-[1000px] items-center">
//           {CallingState !== "joined" && (
//             <p className=" capitalize font-bold text-xl">
//               {CALLING_STATE_TO_LABEL[CallingState]}
//             </p>
//           )}
//           <CallLayout />
//         </div>
//         <div
//           className={cn("h-[calc(100vh-86px)] hidden ml-2", {
//             "show-block": showParticipants,
//           })}
//         >
//           <CallParticipantsList onClose={() => setShowParticipants(false)} />
//         </div>
//       </div>
//       {/* video layout and call controls */}
//       <div id="controls" className="fixed bottom-0 left-1/2 -translate-x-1/2  flex w-full items-center justify-center gap-5">
//         <CallControls onLeave={() => router.push(`/`)} />

//         <DropdownMenu>
//           <div className="flex items-center">
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
//               <LayoutList size={20} className="text-white" />
//             </DropdownMenuTrigger>
//           </div>
//           <DropdownMenuContent className="border-dark-1 bg-dark-1 bg-[#19232d] text-white">
//             {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
//               <div key={index}>
//                 <DropdownMenuItem onClick={() => handleLayoutChange(item.toLowerCase())}>
//                   {item}
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator className="border-dark-1" />
//               </div>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//         {/* ///// */}
//         {roomOwner && (
//           <Button
//             variant="destructive"
//             className="rounded-3xl"
//             onClick={() => setModalOpen(!modalOpen)}
//           >
//             End call for everyone
//           </Button>
//         )}
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

const CallLayout = ({ layout }) => {
  console.log("🚀 ~ CallLayout ~ layout:", layout);

  // Memoizing the layout rendering
  const renderLayout = useMemo(() => {
    if (layout === "grid") {
      return <PaginatedGridLayout />;
    }
    if (layout === "speaker-right") {
      return <SpeakerLayout participantsBarPosition="left" />;
    }
    // Default case
    return <SpeakerLayout participantsBarPosition="right" />;
  }, [layout]); // Dependency array ensures this runs only when `layout` changes

  return <>{renderLayout}</>;
};
const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [layout, setLayout] = useState("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState, useLocalParticipant } = useCallStateHooks();
  const [modalOpen, setModalOpen] = useState(false);

  // Always call hooks
  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const call = useCall();

  // Perform conditional rendering after calling all hooks
  if (callingState !== CallingState.JOINED && callingState !== CallingState.LEFT) {
    return <Loading />;
  }

  const roomOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  // const handleLayoutChange = useCallback(
  //   (newLayout) => {
  //     if (layout !== newLayout) {
  //       setLayout(newLayout); // This will trigger a re-render with the new layout
  //     }
  //   },
  //   [layout]
  // );

  const handleLayoutChange = (newLayout) => {
    if (layout !== newLayout) {
      setLayout(newLayout); // This will trigger a re-render with the new layout
    }
  };

  return (
    <section className="relative h-full w-full overflow-hidden pt-4 text-white">
      {/* Main content */}

      <div className="px-5">
        <Modal
          isOpen={modalOpen}
          title="End call for everyone?"
          buttonLabel="End"
          type="endCall"
          onClose={() => setModalOpen(false)}
        />
      </div>

      <div className="relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[100vw] min-w-[80vw] w-[75vw] h-[80vh] items-center">
          <CallLayout layout={layout} />
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
      </div>

      {/* Call controls */}
      <div
        id="controls"
        className="fixed flex-wrap bottom-0 left-1/2 -translate-x-1/2  flex w-full items-center justify-center gap-5"
      >
        <CallControls onLeave={() => router.push(`/`)} />

        {/* End Call button for owner */}
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
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 bg-[#19232d] text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => handleLayoutChange(item.toLowerCase())}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <Button
          className="bg-[#19232d] hover:bg-[#4c535b] rounded-3xl"
          onClick={() => {
            setShowParticipants(!showParticipants);
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faUsersViewfinder} size="xl" color="#eaeaea" />
        </Button>
      </div>
    </section>
  );
};

export default MeetingRoom;
