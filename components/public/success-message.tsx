"use client";
import { Typography } from "../ui/mixed/typography";
import { Icon } from "../ui/mixed/icon";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const SuccessMessage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      <div className="mt-3 text-center sm:mt-5" aria-label="Success message">
        <Icon name="info" />
        <Typography variant="title">Thank You</Typography>
        <Typography variant="body">
          Your information was submitted to our team of immigration attorneys.
          Expect an email from hello@tryalma.ai.
        </Typography>
      </div>
      <div className="mt-5 sm:mt-6">
        <Button
          variant="default"
          className="w-full"
          onClick={handleBack}
          aria-label="Go Back to Homepage"
        >
          Go Back to Homepage
        </Button>
      </div>
    </>
  );
};
