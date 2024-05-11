import "../../globals.css";

import { Toaster } from "@/components/ui/toaster";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import { ClerkProvider } from "@clerk/nextjs";

export default function MeetingLayout({ children }) {
  return (
    <main className="w-full h-[94vh] flex justify-center items-center bg-foreground text-gray-100">
      {/* <StreamVideoProvider> */}
        {children}
        {/* </StreamVideoProvider> */}
    </main>
  );
}
