"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { ErrorAlert } from "@/components/ui/mixed/error-alert";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/ui/mixed/form-error";
import { CardBox } from "@/components/ui/mixed/card-box";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/mixed/typography";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { loading, signOut, signIn } = useAuth();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError("");
    const result = await signIn(data.email, data.password);
    if (!result.success) {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-2 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Typography variant="title" className="mt-6 text-center">
          Admin Login
        </Typography>
      </div>

      <CardBox>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && <ErrorAlert error={error} />}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled={loading}
              />
              <FormError message={errors?.email?.message} />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled={loading}
              />
              <FormError message={errors?.password?.message} />
            </div>
          </div>

          <Button
            variant="default"
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardBox>
      <div className="mt-2 text-center">
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
          Back
        </Link>
      </div>
    </div>
  );
}
