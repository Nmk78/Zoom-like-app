import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <SignUp path="/sign-up" />
    </div>
  );
}
