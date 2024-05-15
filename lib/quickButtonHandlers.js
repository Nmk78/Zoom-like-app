// import { useRouter } from "next/navigation";

// export const createMeeting = async (
//   user,
//   client,
//   setLoading,
//   initialValues,
//   setCall,
//   router,
//   toast
// ) => {
//   if (!user || !client) {
//     console.log("🚀 ~ createMeeting ~ user :", user, "client :", client);

//     return;
//   }
//   setLoading(true);

// // const router = useRouter()


//   try {
// const id = Math.floor(Math.random() * 900) + 100 +"-"+ (Math.floor(Math.random() * 900) + 100)
//     const call = client.call("default", id); // Default was Video + Audio call //Create 3 random digit for meeting id and link after it would something like  125-851
//     // const call = client.call("default", id); // Default was Video + Audio call //Create 3 random digit for meeting id and link after it would something like  125-851
//     console.log("🚀 ~ id:", id)
//     if (!call) {
//       throw new Error("Failed to create meeting!");
//     }
//     const startedAt =
//       initialValues.dateTime.toISOString() || new Date(Date.now).toISOString();
//     const title = initialValues.title || "Instant Meeting";
//     const description = initialValues.description || "";
//     await call.getOrCreate({
//       data: {
//         starts_at: startedAt,
//         custom: {
//           title,
//           description,
//         },
//       },
//     });

//     console.log("🚀 ~ call:", call)
//     setCall(call);
//     // router.push(`/meeting/${call.id}`);

//     if (!initialValues.description) {
//       router.push(`/meeting/${call?.id}`);
//     }
//     toast({
//       title: "Meeting Created",
//     });
//     setLoading(false);
//     return call.id;
//   } catch (error) {
//     console.log("🚀 ~ error:", error)
//     setLoading(false);
//     throw new Error(error);
//   }
// };
