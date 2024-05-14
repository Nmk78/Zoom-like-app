import React from "react";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const MeetingCard = ({ title, description, date, type }) => {
  return (
    <div className=" bg-background px-5 py-5 w-[400px] rounded-md">
      <div id="title" className="font-bold text-2xl mb-3">
        {title || "Test Title"}
      </div>
      <div id="description" className=" font-semibold text-xl mb-2">
        {description || "Hello World, I'm from matrix!"}
      </div>
      <div id="date">{date || "March 15, 2024 - 10:00PM"}</div>
      {type == "scheduleMeeting" && (
        <div id="buttons" className="w-full flex justify-end gap-2 mt-5">
          <Button className="px-4 h-9 rounded-sm text-gray-100">Start</Button>
          <Button className="px-4 h-9 rounded-sm text-gray-100 bg-foreground hover:bg-background">
            {" "}
            <FontAwesomeIcon icon={faCopy} size="xl" color="#e1e1e1" /> Copy
            invitation
          </Button>
        </div>
      )}
    </div>
  );
};

export default MeetingCard;
