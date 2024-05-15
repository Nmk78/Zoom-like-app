import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const useGetCallsByUser = () => {
  const { user, isLoaded: isUserLoaded } = useUser(); // Add isLoaded to check if user is loaded
  // console.log("🚀 ~ useGetCallsByUser ~ user:", user);
  const [isLoading, setLoading] = useState(false);
  const [callList, setCallList] = useState();

  const client = useStreamVideoClient();

  useEffect(() => {
    if(!client || !user){
      return
    }
    setLoading(true);
    const getCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });
        setCallList(calls);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    if(isUserLoaded && client && user){
      getCall();
    }
  }, [client, isUserLoaded, setLoading, user]);
  // console.log("🚀 ~ useGetCallsByUser ~ callList:", callList);

  const now = new Date();

  const previousCalls = callList?.filter(({ state: { startsAt, endedAt } }) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  const scheduled = callList?.filter(({ state: { startsAt } }) => {
    return startsAt && new Date(startsAt) > now;
  });
  return {
    callList,   // if it was needeed
    previousCalls,
    scheduled,
    recordings: callList,
    isLoading,
  };
};

export default useGetCallsByUser;

