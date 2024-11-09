"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Button } from "./ui/button";
import {
  useCall,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGetCallById } from "@/hooks/useGetCallById";
import { ToyBrick } from "lucide-react";
// import { createMeeting } from "@/lib/quickButtonHandlers";

const Modal = ({ isOpen, onClose, title, type, buttonLabel }) => {
  const currentCall = useCall();

  const router = useRouter();
  const client = useStreamVideoClient();
  const now = new Date();

  const { isLoaded, isSignedIn, user } = useUser();
  const [initialValues, setInitialValues] = useState({
    title: "",
    dateTime: new Date(),
    description: "",
  });

  const [joinParam, setJoinParam] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [call, setCall] = useState();
  const { toast } = useToast();
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();

  const [scheduleMeetingDetails, setScheduleMeetingDetails] = useState(call);

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${scheduleMeetingDetails?.id}`;

  const createMeeting = async () => {
    if (!user || !client) {
      console.log("🚀 ~ createMeeting ~ user :", user, "client :", client);

      return;
    }
    setLoading(true);

    try {
      const id =
        Math.floor(Math.random() * 900) +
        100 +
        "-" +
        (Math.floor(Math.random() * 900) + 100);
      const call = client.call("default", id); // Default was Video + Audio call //Create 3 random digit for meeting id and link after it would something like  125-851
      // const call = client.call("default", id); // Default was Video + Audio call //Create 3 random digit for meeting id and link after it would something like  125-851
      console.log("🚀 ~ id:", id);
      if (!call) {
        throw new Error("Failed to create meeting!");
      }
      const startedAt =
        initialValues.dateTime.toISOString() ||
        new Date(Date.now).toISOString();
      const title = initialValues.title || "Instant Meeting";
      const description = initialValues.description || "";
      await call.getOrCreate({
        data: {
          starts_at: startedAt,
          custom: {
            title,
            description,
          },
        },
      });

      console.log("🚀 ~ call:", call);
      setCall(call);
      // router.push(`/meeting/${call.id}`);

      if (call) {
        router.push(`/meeting/${call?.id}`);
      }
      toast({
        title: "Meeting Created",
      });
      setLoading(false);
      return call;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setLoading(false);
      throw new Error(error);
    }
  };

  const scheduleMeeting = async () => {
    console.log(scheduleMeetingDetails);

    if (scheduleMeetingDetails) {
      console.log("Inside");
      navigator.clipboard.writeText(meetingLink);
      toast({ title: "Link Copied" });
    }

    // Wait for createMeeting to complete
    const call = await createMeeting();
    console.log("🚀 ~ scheduleMeeting ~ call:", call);

    setScheduleMeetingDetails(call);
  };

  const joinMeeting = (param) => {
    const urlPattern = /^(http|https):\/\/[^\s$.?#].[^\s]*$/gm;

    if (urlPattern.test(param)) {
      const segments = param.split("/");

      const id = segments.pop() || segments.pop(); // extra second one for potential tailing slash like abc.com/123/
      router.push(`/meeting/${id}`);
    } else {
      /// IF user add only id
      router.push(`/meeting/${param}`);
    }
  };

  const handler = async () => {
    console.log("modal handler run");
    switch (type) {
      case "instantMeeting":
        console.log(initialValues);
        console.log("modal handler run with instantMeeting");
        await createMeeting();
        break;
      case "joiningMeeting":
        if (joinParam != undefined) {
          joinMeeting(joinParam);
        }
        break;
      case "scheduleMeeting":
        // console.log(scheduleMeetingDetails);
        // if (scheduleMeetingDetails) {
        //   console.log("Inside");
        //   navigator.clipboard.writeText(meetingLink);
        //   toast({ title: "Link Copied" });
        // }
        // createMeeting();
        // setScheduleMeetingDetails(call);
        scheduleMeeting();
        break;
      case "endCall":
        await currentCall?.endCall();
        router.push("/");
        break;
      default:
        return;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className=" text-gray-100">
      <DialogContent className="gap-y-5 w-[90%] max-w-96 rounded-md mx-auto md:mx-0">
        <DialogHeader>
          <DialogTitle className="text-gray-100">{title}</DialogTitle>
        </DialogHeader>
        {type == "joiningMeeting" && (
          <div className="text-gray-100">
            <Label htmlFor="title">Meeting Link or Code</Label>
            <Input
              type="link"
              id="link"
              className="mb-5 mt-3"
              onChange={(e) => {
                setJoinParam(e.target.value);
              }}
            />
          </div>
        )}
        {(type === "instantMeeting" ||
          (type === "scheduleMeeting" && !scheduleMeetingDetails)) && (
          <div>
            <div className="text-gray-100">
              <Label htmlFor="title">Title</Label>
              <Input
                id="Title"
                className="mb-5 mt-3"
                onChange={(e) => {
                  const newValue = e.target.value;
                  setInitialValues((prevValues) => ({
                    ...prevValues,
                    title: newValue,
                  }));
                }}
              />
            </div>
            <div className="text-gray-100">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                className="mb-5 mt-3"
                onChange={(e) => {
                  const newValue = e.target.value;
                  setInitialValues((prevValues) => ({
                    ...prevValues,
                    description: newValue,
                  }));
                }}
              />
            </div>
          </div>
        )}

        {type == "scheduleMeeting" &&
          (scheduleMeetingDetails ? (
            <div>
              <DialogDescription>Meeting Created</DialogDescription>
            </div>
          ) : (
            <DatePicker
              className="bg-secondary text-gray-100 px-4 py-1 rounded-md"
              selected={initialValues.dateTime}
              onChange={(date) => {
                setInitialValues({ ...initialValues, dateTime: date });
              }}
              showTimeSelect
              dateFormat="Pp"
              timeIntervals={3}
              timeCaption="time"
              startDate={Date.now()}
            />
          ))}

        <Button
          onClick={handler}
          className={cn("text-gray-100", {
            "bg-red-700 hover:bg-red-600": type == "endCall",
          })}
        >
          {loading
            ? "Loading"
            : type == "scheduleMeeting" && scheduleMeetingDetails
            ? "Copy"
            : buttonLabel}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
