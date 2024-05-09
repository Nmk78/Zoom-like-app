import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Nav from "@/components/Nav";
import SideNav from "@/components/SideNav";
import { Toaster } from "@/components/ui/toaster";
import StreamVideoProvider from "@/providers/StreamClientProvider";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-foreground">
          <header>
            <Nav />
          </header>
          <main className="w-full h-[94vh] flex justify-start items-center bg-foreground text-gray-100">
            <SideNav />
            <StreamVideoProvider>
              {children}
              </StreamVideoProvider>
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
