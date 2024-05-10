// import "../../../app/global.css";

import { Toaster } from "@/components/ui/toaster";
import StreamVideoProvider from "@/providers/StreamClientProvider";

export default function MeetingLayout({ children }) {
  return (
    <body className="w-full h-[94vh] flex justify-start items-center bg-foreground text-gray-100">
      <StreamVideoProvider>{children}</StreamVideoProvider>
      <Toaster />
    </body>
  );
}
