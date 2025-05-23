import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <main
      className={cn(
        "relative max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 bg-white overflow-hidden",
        className
      )}
      aria-label="Main content container"
    >
      {children}
    </main>
  );
};
