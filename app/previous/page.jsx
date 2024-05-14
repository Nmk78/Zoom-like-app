"use client";

import { useGetCallById } from "@/hooks/useGetCallById";
import useGetCallsByUser, { useGetCalls } from "@/hooks/useGetCallsByUser";
import React from "react";

const PreviousMeetings = () => {
  const { previousCalls } = useGetCallsByUser();
  console.log("🚀 ~ PreviousMeetings ~ callList:", previousCalls);
  return <div>Previous</div>;
};

export default PreviousMeetings;
