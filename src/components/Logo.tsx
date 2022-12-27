import React from "react";

export interface ILogoProps {
  className?: string;
}
function Logo({ className = "" }: ILogoProps) {
  return (
    <h1 className={"m-2 md:text-3xl font-bold text-white text-xl " + className}>
      Flix <span className="text-red-500">Flex</span>
    </h1>
  );
}

export default Logo;
