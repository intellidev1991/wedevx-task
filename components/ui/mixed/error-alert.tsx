interface ErrorAlertProps {
  error?: string;
}
export const ErrorAlert = ({ error }: ErrorAlertProps) => {
  return (
    <div className="rounded-md bg-red-50 p-4" aria-label="Error alert">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{error}</h3>
        </div>
      </div>
    </div>
  );
};
