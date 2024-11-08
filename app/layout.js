import { ClerkProvider } from "@clerk/nextjs";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import "./globals.css";
import Nav from "@/components/Nav";
import SideNav from "@/components/SideNav";
import { Toaster } from "@/components/ui/toaster";
import StreamVideoProvider from "@/providers/StreamClientProvider";

export const metadata = {
  title: "mooZ",
  description: "A video conferencing website like zoom.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <StreamVideoProvider>
        <html lang="en">
          {/* <body className="bg-foreground h-[96vh] max-h-screen">
            <Nav />
            <main className="w-full h-full flex justify-start items-start bg-foreground text-gray-100">
              <SideNav />
              {children}
            </main>
            <Toaster />
          </body> */}
          <body className="bg-foreground min-h-screen overflow-hidden">
            <Nav />
            <main className="w-full h-screen flex justify-start items-start bg-foreground text-gray-100 overflow-hidden">
              <SideNav />
              <div className="flex-1 overflow-y-auto">{children}</div>
            </main>
            <Toaster />
          </body>
        </html>
      </StreamVideoProvider>
    </ClerkProvider>
  );
}
