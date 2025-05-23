"use client";

import { useState } from "react";
import { LeadForm } from "@/components/public/lead-form";
import { HeaderSubmit } from "@/components/ui/mixed/header-submit";
import { Container } from "@/components/ui/mixed/container";
import { SuccessMessage } from "@/components/public/success-message";

export default function SubmitPage() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderSubmit />

      <Container>
        {!isFormSubmitted ? (
          <LeadForm onSuccess={handleSuccess} />
        ) : (
          <SuccessMessage />
        )}
      </Container>
    </div>
  );
}
