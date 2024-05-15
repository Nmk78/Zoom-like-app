import React from "react";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faShare } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const MeetingCard = ({ title, description, code, date, start, end, type }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleStart = (code) => {
    if (!code) return;
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${code}`;
    router.push(meetingLink);
    toast({ title: "Redirecting to meeting" });
  };
  const handleCopy = (code) => {
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${code}`;
    navigator.clipboard.writeText(meetingLink);
    toast({ title: "Link Copied" });
  };

  return (
    <div className=" bg-background px-5 py-5 my-4 mx-2 lg:w-[47%] xl:w-[32%] rounded-md">
      <div id="title" className="font-bold text-2xl mb-3">
        {title}
      </div>
      <div id="description" className=" font-semibold text-xl mb-2">
        {description}
      </div>
      <div id="date">{date}</div>
      {type == "recording" && (
        <div id="startDateAndEndDate" className="flex justify-start">
          <div id="startAt">Started: {start}</div>
          <div id="endAt">Ended: {end}</div>
        </div>
      )}
      {type == "upcoming-calls" ||
        (type == "recording" && (
          <div className="flex items-center justify-around">
            {type == "upcoming-calls" && (
              <p
                id="meetingId"
                title="Meeting ID"
                className=" w-[100px] mt-5 h-full text-center px-3 py-1.5 bg-foreground"
              >
                {code}
              </p>
            )}
            <div id="buttons" className="w-full flex justify-end gap-2 mt-5">
              <Button
                onClick={() => {
                  handleStart(code);
                }}
                className="px-4 h-9 rounded-sm text-gray-100"
              >
                Start
              </Button>
              <Button
                onClick={() => {
                  handleCopy(code);
                }}
                className="px-4 h-9 gap-1 rounded-sm text-gray-100 bg-foreground hover:bg-background"
              >
                {type == "upcoming-call" ? (
                  <>
                    <FontAwesomeIcon icon={faCopy} size="xl" color="#e1e1e1" />{" "}
                    Copy invitation
                  </>
                ) : type == "recording" ? (
                  <>
                    <FontAwesomeIcon icon={faShare} size="xl" color="#e1e1e1" />
                    Share
                  </>
                ) : (
                  <></>
                )}
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MeetingCard;
