import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  variant?: "title" | "body";
}
export const Typography = ({
  children,
  variant,
  className,
}: TypographyProps) => {
  const baseStyles = "text-gray-900 dark:text-white mb-4";
  const titleStyles = "text-2xl font-bold";
  const bodyStyles = "text-base font-normal";

  const classValue = cn(
    baseStyles,
    variant === "title" ? titleStyles : bodyStyles
  );

  return (
    <p
      className={cn(classValue, className)}
      aria-label={variant === "title" ? "Title" : "Body"}
    >
      {children}
    </p>
  );
};
