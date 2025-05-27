"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Visa } from "@/types";
import { createLead } from "@/lib/api";
import { FileUp } from "lucide-react";
import { Icon } from "../ui/mixed/icon";
import { Typography } from "../ui/mixed/typography";
import { Button } from "../ui/button";
import { FormError } from "../ui/mixed/form-error";
import { Checkbox } from "@/components/ui/checkbox";
import { countries } from "@/constants/countries";
import { visaOptions } from "@/constants/visaOptions";
import { cx } from "class-variance-authority";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country: z.string().min(1, { message: "Country is required" }),
  linkedInProfile: z
    .string()
    .url({ message: "Invalid LinkedIn URL" })
    .regex(/^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_%]+\/?$/, {
      message:
        "Please enter a valid LinkedIn profile URL (e.g. https://www.linkedin.com/in/username)",
    }),
  visasOfInterest: z
    .array(z.string())
    .min(1, { message: "Please select at least one visa" }),
  resumeFile: z.instanceof(File, { message: "Resume file is required" }),
  additionalInfo: z
    .string()
    .min(10, { message: "Please provide at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

interface LeadFormProps {
  onSuccess: () => void;
}

export function LeadForm({ onSuccess }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visasOfInterest: [],
    },
  });

  const countryValue = watch("country");

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      const resumeUrl = data.resumeFile
        ? URL.createObjectURL(data.resumeFile)
        : undefined;

      await createLead({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        linkedInProfile: data.linkedInProfile,
        visasOfInterest: data.visasOfInterest as Visa[],
        resumeUrl,
        additionalInfo: data.additionalInfo,
      });

      setFileName(null);
      onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      aria-label="Visa assessment lead form"
    >
      <div className="text-center mb-12" aria-label="Form introduction">
        <Icon name="info" />
        <Typography variant="title">
          Want to understand your visa options?
        </Typography>
        <Typography variant="body">
          Submit the form below and our team of experienced attorneys will
          review your information and send a preliminary assessment of your case
          based on your goals.
        </Typography>
      </div>
      <div className="space-y-3" aria-label="Personal information section">
        <input
          type="text"
          placeholder="First Name"
          aria-label="First Name"
          {...register("firstName")}
          className="w-full px-4 py-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400"
        />
        <FormError message={errors.firstName?.message} />

        <input
          type="text"
          placeholder="Last Name"
          aria-label="Last Name"
          {...register("lastName")}
          className="w-full px-4 py-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400"
        />
        <FormError message={errors.lastName?.message} />

        <input
          type="email"
          placeholder="Email"
          aria-label="Email"
          {...register("email")}
          className="w-full px-4 py-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400"
        />
        <FormError message={errors.email?.message} />

        <select
          {...register("country")}
          aria-label="Country of Citizenship"
          className={cx(
            "w-full px-4 py-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent appearance-none bg-white",
            countryValue === "" ? "text-gray-400" : "text-gray-900"
          )}
        >
          <option value="" className="text-gray-400">
            Country of Citizenship
          </option>
          {countries.map((country) => (
            <option key={country} value={country} className="text-gray-900">
              {country}
            </option>
          ))}
        </select>
        <FormError message={errors.country?.message} />

        <input
          type="url"
          placeholder="LinkedIn Profile URL"
          aria-label="LinkedIn Profile URL"
          {...register("linkedInProfile")}
          className="w-full px-4 py-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400"
        />
        <FormError message={errors.linkedInProfile?.message} />
      </div>

      <div className="space-y-4" aria-label="Visa categories section">
        <div className="text-center">
          <Icon name="dice" />
          <Typography variant="title">Visa categories of interest?</Typography>
          <Controller
            name="visasOfInterest"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-3 justify-start">
                {visaOptions.map((visa) => (
                  <label
                    key={visa}
                    className="flex items-center gap-3 w-full max-w-md cursor-pointer"
                    aria-label={visa}
                  >
                    <Checkbox
                      checked={field.value.includes(visa)}
                      onCheckedChange={(checked) => {
                        const value = visa as Visa;
                        let newValues: string[];
                        if (checked) {
                          newValues = [...field.value, value];
                        } else {
                          newValues = field.value.filter((v) => v !== value);
                        }
                        field.onChange(newValues);
                      }}
                      id={`visa-checkbox-${visa}`}
                      aria-label={visa}
                    />
                    <span className="ml-2">{visa}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>
        <FormError message={errors.visasOfInterest?.message} />
      </div>

      <div className="space-y-4" aria-label="Resume upload section">
        <div className="relative border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <Controller
            name="resumeFile"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                aria-label="Upload resume"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                  setFileName(file ? file.name : null);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx"
              />
            )}
          />
          <div className="space-y-2">
            <FileUp className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              <span className="font-medium text-black">Upload a file</span>
              {" or drag and drop"}
            </div>
            <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
            {fileName && (
              <p className="text-sm font-medium text-gray-900">{fileName}</p>
            )}
          </div>
        </div>
        <FormError message={errors.resumeFile?.message} />
      </div>

      <div className="space-y-4" aria-label="Additional information section">
        <div className="text-center">
          <Icon name="heart" />
          <Typography variant="title">How can we help you?</Typography>
          <textarea
            {...register("additionalInfo")}
            rows={6}
            aria-label="Additional information"
            className="w-full px-4 py-3 text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400"
            placeholder="what is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
          />
          <FormError message={errors.additionalInfo?.message} />
        </div>
      </div>

      <Button
        type="submit"
        variant="default"
        disabled={isSubmitting}
        className="w-full py-3 px-4"
        aria-label="Submit form"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
