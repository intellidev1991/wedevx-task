"use client";
import Image from "next/image";

interface IconProps {
  name: "info" | "dice" | "heart";
}

export const Icon = ({ name }: IconProps) => {
  const src =
    name === "info"
      ? "images/info.png"
      : name === "dice"
      ? "images/dice.png"
      : name === "heart"
      ? "images/heart.png"
      : "";

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={`${name} icon`}
      width={56}
      height={56}
      className="w-14 h-14 object-cover mx-auto mb-1"
      aria-label={`${name} icon`}
    />
  );
};
