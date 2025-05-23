interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <p className="text-sm text-red-600 text-left" aria-label="Form error">
      {message}
    </p>
  );
};
