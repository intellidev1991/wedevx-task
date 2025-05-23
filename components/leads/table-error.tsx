"use client";

interface TableErrorProps {
  error: string;
}
export const TableError = ({ error }: TableErrorProps) => {
  return (
    <div className="bg-red-50 p-4 rounded-md">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{error}</h3>
        </div>
      </div>
    </div>
  );
};
