import React from "react";
import { ParticipantViewUI } from "./ParticipantView";
import { StreamCall } from "@stream-io/video-react-sdk";

export const Meeting = () => {
  return (
    <div>
      {/* UI */}
      <StreamCall>
        <ParticipantViewUI />
      </StreamCall>
    </div>
  );
};
