// // import { VideoPreview } from "@stream-io/video-react-sdk";
// // import React from "react";

// // const MeetingSetup = () => {
// //   return (
// //     <div>
// //       <span>Meeting Setup</span>
// //       <VideoPreview />
// //     </div>
// //   );
// // };

// // export default MeetingSetup;

// import {
//   useConnectedUser,
//   DefaultVideoPlaceholder,
//   VideoPreview,
//   useCall,
//   DeviceSettings,
//   useCallStateHooks,
// } from "@stream-io/video-react-sdk";
// import Loading from "./Loading";
// import { CameraIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Button } from "./ui/button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faVideoCamera, faMicrophone } from "@fortawesome/free-solid-svg-icons";
// import { cn } from "@/lib/utils";
// import { useToast } from "./ui/use-toast";

// //   import { CameraIcon, LoadingIndicator } from '../icons';

// export const DisabledVideoPreview = () => {
//   const connectedUser = useConnectedUser();
//   if (!connectedUser) return null;
//   console.log("🚀 ~ DisabledVideoPreview ~ connectedUser:", connectedUser);

//   return (
//     <div className="w-3/5 h-1/2">
//       <DefaultVideoPlaceholder
//         participant={{
//           image: connectedUser?.image,
//           name: connectedUser?.name,
//         }}
//       />
//     </div>
//   );
// };

// const NoCameraPreview = () => (
//   <div>
//     <CameraIcon />
//     No camera
//   </div>
// );

// const StartingCameraPreview = () => (
//   <div>
//     <Loading />
//   </div>
// );

// const MeetingSetup = ({ setMeetingReady }) => {
//   const [micAndCameraOpen, setMicAndCameraOpen] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const [micOpen, setMicOpen] = useState(false);

//   const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
//   const callStartsAt = useCallStartsAt();
//   const callEndedAt = useCallEndedAt();
//   const callTimeNotArrived =
//     callStartsAt && new Date(callStartsAt) > new Date();
//   const callHasEnded = !!callEndedAt;
//   const call = useCall();
//   const { toast } = useToast();

//   if (!call) {
//     throw new Error(
//       "useStreamCall must be used within a StreamCall component."
//     );
//   }

//   if (callTimeNotArrived) {
//     toast({
//       title:
//         "Your Meeting has not started yet. It is scheduled for " +
//         callStartsAt.toLocaleString(),
//     });
//   }

//   if (callHasEnded) {
//     toast({
//       title: "The call has been ended by the host",
//     });
//   }
//   useEffect(() => {
//     // if (!micAndCameraOpen) {
//     //   call.camera.disable();
//     //   call.microphone.disable();
//     // } else {
//     //   call.camera.enable();
//     //   call.microphone.enable();
//     // }
//     if (cameraOpen) {
//       call.camera.disable();
//     } else {
//       call.camera.enable();
//     }
//     if (micOpen) {
//       call.microphone.disable();
//     } else {
//       call.microphone.enable();
//     }
//   }, [call.camera, call.microphone, cameraOpen, micAndCameraOpen, micOpen]);

//   return (
//     <div className=" flex flex-col items-center justify-center">
//       <VideoPreview
//         className="w-full h-full flex items-center justify-center"
//         DisabledVideoPreview={DisabledVideoPreview}
//         NoCameraPreview={NoCameraPreview}
//         StartingCameraPreview={StartingCameraPreview}
//       />
//       <div className="mt-3 flex justify-center items-center">
//         <Button
//           className={cn("w-20 mx-3 my-1", {
//             "bg-red-600 hover:bg-red-700": cameraOpen,
//           })}
//           onClick={() => setCameraOpen(!cameraOpen)}
//         >
//           <FontAwesomeIcon icon={faVideoCamera} size="2x" color="#eaeaea" />
//         </Button>{" "}
//         <Button
//           className={cn("w-20 mx-3 my-1", {
//             "bg-red-600 hover:bg-red-700": micOpen,
//           })}
//           onClick={() => setMicOpen(!micOpen)}
//         >
//           {" "}
//           <FontAwesomeIcon
//             icon={faMicrophone}
//             size="2x"
//             className=""
//             color="#eaeaea"
//           />
//         </Button>{" "}
//         <Button
//           className={cn("mx-3 my-1 bg-green-600 hover:bg-green-700")}
//           onClick={() => {
//             call.join();
//             setMeetingReady(true);
//           }}
//         >
//           {" "}
//           <span className="text-gray-100 text-xl font-semibold">
//             Join meeting
//           </span>
//         </Button>
//         <DeviceSettings />
//       </div>
//     </div>
//   );
// };
// export default MeetingSetup;

"use client";

import {
  useConnectedUser,
  DefaultVideoPlaceholder,
  VideoPreview,
  useCall,
  DeviceSettings,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import Loading from "./Loading";
import { CameraIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const DisabledVideoPreview = () => {
  const connectedUser = useConnectedUser();
  if (!connectedUser) return null;

  return (
    <div className="w-3/5 h-1/2">
      <DefaultVideoPlaceholder
        participant={{
          image: connectedUser?.image,
          name: connectedUser?.name,
        }}
      />
    </div>
  );
};

const NoCameraPreview = () => (
  <div>
    <CameraIcon />
    No camera
  </div>
);

const StartingCameraPreview = () => (
  <div>
    <Loading />
  </div>
);

const MeetingSetup = ({ setMeetingReady }) => {
  const [cameraOpen, setCameraOpen] = useState(true); // Default to true for initial enable
  const [micOpen, setMicOpen] = useState(true); // Default to true for initial enable
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const call = useCall();
  const { toast } = useToast();
  const router = useRouter();
  const now = new Date();

  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt).getTime() > now.getTime() + 600000; /// 600000 for 10 minutes.

  const callHasEnded = !!callEndedAt;
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  useEffect(() => {
    if (!call) {
      throw new Error(
        "useStreamCall must be used within a StreamCall component."
      );
    }
    console.log("🚀 ~ useEffect ~ callTimeNotArrived:", callTimeNotArrived);

    if (callTimeNotArrived) {
      toast({
        title:
          "Your Meeting has not started yet. It is scheduled for " +
          callStartsAt.toLocaleString(),
      });

      if (callHasEnded) {
        setRedirectCountdown(5);
        toast({
          title: "The call has been ended by the host",
          description: "Redirecting to the homepage in 5 seconds...",
        });
      }

      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            router.push("/");
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [call, callTimeNotArrived, callHasEnded, toast, callStartsAt, router]);

  useEffect(() => {
    if (cameraOpen) {
      call.camera.enable();
    } else {
      call.camera.disable();
    }

    if (micOpen) {
      call.microphone.enable();
    } else {
      call.microphone.disable();
    }
  }, [call, cameraOpen, micOpen]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <VideoPreview
        className="w-full max-w-96 md:max-w-max  h-full flex items-center justify-center"
        DisabledVideoPreview={DisabledVideoPreview}
        NoCameraPreview={NoCameraPreview}
        StartingCameraPreview={StartingCameraPreview}
      />
      <div className="mt-3 flex space-x-2 md:space-x-4 justify-center items-center">
        <Button
          className={cn("w-20 my-1", {
            "bg-red-600 hover:bg-red-700": !cameraOpen,
          })}
          onClick={() => setCameraOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faVideoCamera} size="2x" color="#eaeaea" />
        </Button>
        <Button
          className={cn("w-20 my-1", {
            "bg-red-600 hover:bg-red-700": !micOpen,
          })}
          onClick={() => setMicOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faMicrophone} size="2x" color="#eaeaea" />
        </Button>
        <Button
          disabled={callTimeNotArrived}
          className=" my-1 bg-green-600 hover:bg-green-700"
          onClick={() => {
            call.join();
            setMeetingReady(true);
          }}
        >
          <span className="text-gray-100 text-xl font-semibold">
            Join meeting
          </span>
        </Button>
        <DeviceSettings />
      </div>
    </div>
  );
};

export default MeetingSetup;
