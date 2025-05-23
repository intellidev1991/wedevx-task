interface TitleProps {
  children: React.ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  return (
    <div
      className="flex justify-between items-center"
      aria-label="Section title"
    >
      <h1 className="text-2xl font-bold tracking-tight ml-12 md:ml-0">
        {children}
      </h1>
    </div>
  );
};
