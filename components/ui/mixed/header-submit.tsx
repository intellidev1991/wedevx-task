import { Logo } from "../logo";
import { Typography } from "./typography";
import Image from "next/image";

export const HeaderSubmit = () => {
  return (
    <header
      className="relative border-b border-gray-200 w-full header-bg flex flex-row items-center h-auto md:items-start md:h-[320px]"
      aria-label="Submit header"
    >
      <div className="flex-shrink-0 flex items-center justify-center">
        <Image
          src="images/img.png"
          alt="Hero Image"
          width={96}
          height={132}
          className="w-20 h-28 object-cover md:w-56 md:h-80"
        />
      </div>
      <div className="flex-1 md:absolute md:left-56 md:top-10 md:px-8 md:py-12">
        <div className="flex items-center justify-start ml-4">
          <Logo />
        </div>
        <Typography
          variant="title"
          className="mt-2 text-base ml-4 md:mt-8 md:text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight text-left"
        >
          Get An Assessment
          <br />
          Of Your Immigration Case
        </Typography>
      </div>
    </header>
  );
};
