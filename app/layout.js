import { ClerkProvider } from "@clerk/nextjs";
import '@stream-io/video-react-sdk/dist/css/styles.css';

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
          <body className="bg-foreground">
            <header>
              <Nav />
            </header>{" "}
            <main className="w-full h-[94vh] flex justify-start items-start bg-foreground text-gray-100">
              <SideNav />
              {children}
            </main>
            <Toaster />
          </body>
        </html>
      </StreamVideoProvider>
    </ClerkProvider>
  );
}
