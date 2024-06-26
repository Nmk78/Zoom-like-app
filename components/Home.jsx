"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { quickButtons } from "@/constants/constants";
import { QuickButton } from "./QuickButton";
import Image from "next/image";
import Loading from "./Loading";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "./ui/use-toast";
import Modal from "./Modal";
import "../app/globals.css";
import useGetCallsByUser from "@/hooks/useGetCallsByUser";

export const UpComingMeetingPreview = ({ title, time }) => {
  return (
    <div className="border-2 rounded-md border-[#fafafa66
    ] p-2 w-full mx-3 mt-2">
      <p id="title" className="text-xl mb-1">
        {title}
      </p>
      <p id="time" className="text-sm">
        {time}
      </p>
    </div>
  );
};

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { scheduled, isLoading } = useGetCallsByUser();
  const router = useRouter();

  const currentDate = new Date();

  // Format date
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  // Format time
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const [dialogData, setDialogData] = useState({});
  const [meetingType, setMeetingType] = useState(undefined);
  /// meeting type should be either scheduleMeeting | joiningMeeting | instantMeeting | undefined (Default)

  return (
    <div className="h-full flex flex-col justify-start items-center px-8 py-4 gap-y-10">
      <Modal
        isOpen={
          (meetingType == "scheduleMeeting") |
          (meetingType == "joiningMeeting") |
          (meetingType == "instantMeeting")
        }
        title={dialogData.title}
        buttonLabel={dialogData.buttonLabel}
        type={dialogData.type}
        onClose={() => setMeetingType(undefined)}
      />
      <div className="relative overflow-hidden w-full ">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 opacity-20 rounded-lg"></div>
        <div className="relative bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg">
          <h1 className="text-3xl font-bold text-white">
            Hello, {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-200">
            {/* This is a glass effect created with Tailwind CSS. */}
          </p>
        </div>
      </div>
      <div
        id="secRow"
        className="w-full max-w-[1200px] h-3/5 max-h-[65%] flex items-center justify-center"
      >
        <div
          id="quickButton"
          className="grid w-1/2 place-items-center items-center max-w-[300px] gap-5 mr-10 grid-cols-2 grid-rows-2 "
        >
          {quickButtons.map(({ label, icon, handler, buttonLabel, type }) => {
            return (
              <QuickButton
                key={label}
                icon={icon}
                label={label}
                handler={() => {
                  setMeetingType(undefined); // Make sure previous meeting type was wiped out
                  if (type == "record") {
                    router.push("/recordings");
                  }
                  setMeetingType(type);
                  setDialogData({
                    title: label,
                    type,
                    buttonLabel,
                  });
                  console.log(type);
                }}
              />
            );
          })}
        </div>
        <div
          id="contentContainer"
          className="relative w-1/2 max-w-[800px] h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 opacity-20 rounded-lg"></div>
          <div className="relative bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-t-lg">
            <div className="h-32 text-3xl font-bold text-white">
              <div className="z-40 text-xl md:text-2xl lg:text-3xl  absolute bottom-2 left-2 text-gray-100 backdrop-blur-sm backdrop-brightness-90 rounded-md p-2">
                <h1>{formattedTime}</h1>
                <h1>{formattedDate}</h1>
              </div>
              <Image
                fill
                src="/preview.jpg"
                alt="preview"
                className="rounded-t-lg w-full h-32 object-cover "
              />
            </div>
          </div>
          <div
            id="content"
            className="w-full h-3/5 flex flex-col px-2 items-center justify-center overflow-scroll overflow-y-scroll"
          >
            {scheduled && <p className="text-gray-200">Upcoming meetings</p>}
            {scheduled ? (
              scheduled
                .sort(
                  (a, b) =>
                    new Date(a.state.startsAt) - new Date(b.state.startsAt)
                )
                .slice(0, 3)
                .map((call, index) => {
                  return (
                    <UpComingMeetingPreview
                      key={index}
                      title={call?.state?.custom?.title || "Untitled Meeting"}
                      time={
                        call?.state?.startsAt
                          ? new Date(call.state.startsAt).toLocaleString()
                          : "Unknown Time"
                      }
                    />
                  );
                })
            ) : !isLoading ? (
              <p className="text-gray-200">No upcoming meeting.</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
