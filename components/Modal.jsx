"use client";
import React, { useState } from "react";
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
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Modal = ({ isOpen, onClose, title, type, buttonLabel }) => {
  const router = useRouter();
  const client = useStreamVideoClient();

  const { isLoaded, isSignedIn, user } = useUser();
  const [initialValues, setInitialValues] = useState({
    dateTime: new Date(),
    description: "",
    meetingLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [call, setCall] = useState();
  const { toast } = useToast();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const createMeeting = async () => {
    if (!user || !client) {
      console.log("🚀 ~ createMeeting ~ user :", user, "client :", client);

      return;
    }
    setLoading(true);

    try {
      const call = client.call("default", crypto.randomUUID()); // Default was Video + Audio call
      console.log("🚀 ~ createMeeting ~ call:", call);
      if (!call) {
        throw new Error("Failed to create meeting!");
      }
      const startedAt =
        initialValues.dateTime.toISOString() ||
        new Date(Date.now).toISOString();
      const description = initialValues.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startedAt,
          custom: {
            description,
          },
        },
      });
      setCall(call);
      if (!initialValues.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  const handler = async () => {
    console.log("modal handler run");
    await createMeeting();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="text-gray-100">
      <DialogContent className="gap-y-5">
        <DialogHeader>
          <DialogTitle className="text-gray-100">{title}</DialogTitle>
        </DialogHeader>
        {type == "joiningMeeting" && (
          <div className="text-gray-100">
            <Label htmlFor="title" className="mb-5">
              Meeting Link
            </Label>
            <Input type="link" id="link" />
          </div>
        )}
        {(type === "instantMeeting" || type === "scheduleMeeting") && (
          <div>
            <div className="text-gray-100">
              <Label htmlFor="title" className="mb-5">
                Title
              </Label>
              <Input id="Title" />
            </div>
            <div className="text-gray-100">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" />
            </div>
          </div>
        )}

        {type == "scheduleMeeting" && (
          <DatePicker
            className="bg-secondary text-gray-100 px-4 py-1 rounded-md"
            selected={initialValues.dateTime}
            onChange={(date) => {
              setInitialValues({ ...initialValues, dateTime: date });
            }}
            showTimeSelect
            dateFormat="Pp"
          />
        )}

        <Button onClick={handler} className="text-gray-100">
          {loading ? "Loading" : buttonLabel}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
