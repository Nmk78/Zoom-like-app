import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const useGetCallsByUser = () => {
  const { user } = useUser();
  console.log("🚀 ~ useGetCallsByUser ~ user:", user);
  const [isLoading, setLoading] = useState(false);
  const [callList, setCallList] = useState();

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!user) throw new Error("Unauthenticated");
    if (!client) throw new Error("Client not found");
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
    getCall();
  }, [client, setLoading, user]);
  console.log("🚀 ~ useGetCallsByUser ~ callList:", callList);

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
