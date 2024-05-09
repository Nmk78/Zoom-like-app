import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export const QuickButton = ({ label, icon, handler }) => {
    return (
      <div className="md:w-32 max-w-40 aspect-square flex flex-col items-center justify-center">
        <Button onClick={() => handler()} className="rounded-lg w-16 h-16">
          <Image src={icon} height={40} width={40} alt={label} />
        </Button>
        <p className="mt-2">{label}</p>
      </div>
    );
  };
  