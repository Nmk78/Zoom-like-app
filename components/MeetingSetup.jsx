// import { VideoPreview } from "@stream-io/video-react-sdk";
// import React from "react";

// const MeetingSetup = () => {
//   return (
//     <div>
//       <span>Meeting Setup</span>
//       <VideoPreview />
//     </div>
//   );
// };

// export default MeetingSetup;

import {
  useConnectedUser,
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  VideoPreview,
  useCall,
  DeviceSettings,
} from "@stream-io/video-react-sdk";
import Loading from "./Loading";
import { CameraIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraAlt,
  faCamera,
  faCameraRetro,
  faVideoCamera,
  faMicrophoneAlt,
  faMicrophone,
  faMicrophoneLines,
  faJoint,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

//   import { CameraIcon, LoadingIndicator } from '../icons';

export const DisabledVideoPreview = () => {
  const connectedUser = useConnectedUser();
  // console.log("🚀 ~ DisabledVideoPreview ~ connectedUser:", connectedUser)
  // if (!connectedUser) return null;

  return (
    <div className="w-3/5 h-1/2">
      <DefaultVideoPlaceholder
        participant={{
          image: connectedUser.image,
          name: connectedUser.name,
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
  const [micAndCameraOpen, setMicAndCameraOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [micOpen, setMicOpen] = useState(false);

  const call = useCall();

  useEffect(() => {
    // if (!micAndCameraOpen) {
    //   call.camera.disable();
    //   call.microphone.disable();
    // } else {
    //   call.camera.enable();
    //   call.microphone.enable();
    // }
    if (cameraOpen) {
      call.camera.disable();
    } else {
      call.camera.enable();
    }
    if (micOpen) {
      call.microphone.disable();
    } else {
      call.microphone.enable();
    }
  }, [call.camera, call.microphone, cameraOpen, micAndCameraOpen, micOpen]);

  return (
    <div className=" flex flex-col items-center justify-center">
      {/* ... other components */}
      {/* <div>Video Preview</div> */}
      <VideoPreview
        className="w-full h-full flex items-center justify-center"
        DisabledVideoPreview={DisabledVideoPreview}
        NoCameraPreview={NoCameraPreview}
        StartingCameraPreview={StartingCameraPreview}
      />
      <div className="mt-3 flex justify-center items-center">
        <Button
          className={cn("w-20 mx-3 my-1", {
            "bg-red-600 hover:bg-red-700": cameraOpen,
          })}
          onClick={() => setCameraOpen(!cameraOpen)}
        >
          <FontAwesomeIcon icon={faVideoCamera} size="2x" color="#eaeaea" />
        </Button>{" "}
        <Button
          className={cn("w-20 mx-3 my-1", {
            "bg-red-600 hover:bg-red-700": micOpen,
          })}
          onClick={() => setMicOpen(!micOpen)}
        >
          {" "}
          <FontAwesomeIcon
            icon={faMicrophone}
            size="2x"
            className=""
            color="#eaeaea"
          />
        </Button>{" "}
        <Button
          className={cn("mx-3 my-1 bg-green-600 hover:bg-green-700")}
          onClick={() => {
            call.join();
            setMeetingReady(true);
          }}
        >
          {" "}
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
