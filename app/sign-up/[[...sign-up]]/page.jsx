import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-[80vh] flex justify-center items-center">
      <SignUp path="/sign-up" />
    </div>
  );
}
