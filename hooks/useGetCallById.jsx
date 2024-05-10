"use client"
// import { useStreamVideoClient } from '@stream-io/video-react-sdk';
// import { useEffect, useState } from "react";

// export const useGetCallById = (id) => {
//     console.log("🚀 ~ useGetCallById ~ id:", id)
//     const [call, setCall] = useState();
//     const [callLoading, setCallLoading] = useState(true);

//     const client = useStreamVideoClient();
//     console.log("🚀 ~ useGetCallById ~ client:", client)

//     useEffect(() => {
//         console.log("Client:", client);
//         console.log("ID:", id);
        
//         // if (!client) {
//         //     console.log("Client is undefined.");
//         //     return;
//         // }
    
//         const getCall = async () => {
//             console.log("🚩🚩🚩Call FN runnnnnnnn")
//             try {
//                 const calls = await client.queryCalls({ filter_conditions: { id } });
//                 console.log("Calls:", calls);
    
//                 if (calls.length > 0) {
//                     console.log("Setting call:", calls[0]);
//                     setCall(calls[0]);
//                 } else {
//                     console.log("No calls found for ID:", id);
//                 }
    
//                 setCallLoading(false);
//             } catch (error) {
//                 console.error("Error fetching call:", error);
//                 setCallLoading(false);
//             }
//         };
    
//         getCall();
//     }, [client, id]);
    
//     console.log("🚀 ~ useGetCallById ~ call:", call);

//     return { call, callLoading };
// };


import { useEffect, useState } from 'react';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (id) => {
  const [call, setCall] = useState();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();
  console.log("🚀 ~ useGetCallById ~ client:", client)

  useEffect(() => {
    if (!client) return;
    
    const loadCall = async () => {
        console.log("RUNNNNNNN")
      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({ filter_conditions: { id } });
        console.log("🚀 ~ loadCall ~ calls:", calls)

        if (calls.length > 0) setCall(calls[0]);

        setIsCallLoading(false);
      } catch (error) {
        console.error(error);
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};