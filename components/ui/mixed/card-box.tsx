interface CardBoxProps {
  children: React.ReactNode;
}

export const CardBox = ({ children }: CardBoxProps) => {
  return (
    <div className="mt-8 w-full max-w-sm mx-auto" aria-label="Card box">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {children}
      </div>
    </div>
  );
};
