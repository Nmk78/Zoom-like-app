import { useEffect, useState } from 'react';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (id) => {
  const [call, setCall] = useState();
  const [callLoading, setCallLoading] = useState(true);

  const client = useStreamVideoClient();
  console.log("🚀 ~ useGetCallById ~ client:", client);

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        console.log("RUNNNNNNN");
        const { calls } = await client.queryCalls({ filter_conditions: { id } });
        console.log("🚀 ~ loadCall ~ calls:", calls);

        if (calls.length > 0) setCall(calls[0]);
        setCallLoading(false);
      } catch (error) {
        console.error(error);
        setCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, callLoading };
};
