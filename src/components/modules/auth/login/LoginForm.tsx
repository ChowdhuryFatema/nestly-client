/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import NLButton from "@/components/ui/core/ImageUploader/NLButton";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [credential, setCredential] = useState("tenant");
  const [reCaptchaStatus, setReCaptchaStatus] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
    ssr: false,
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);

        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleRecaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);

      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (error: any) {
      throw Error(error);
    }
  };

  // inside the component
  // useEffect(() => {
  //   let newValues = {
  //     email: "",
  //     password: "",
  //   };

  //   if (credential === "admin") {
  //     newValues = {
  //       email: "admin@gmail.com",
  //       password: "$Admin123",
  //     };
  //   } else if (credential === "tenant") {
  //     newValues = {
  //       email: "tenant@gmail.com",
  //       password: "$Tenant123",
  //     };
  //   } else if (credential === "landlord") {
  //     newValues = {
  //       email: "landlord@gmail.com",
  //       password: "$Landloard123",
  //     };
  //   }

  //   form.reset(newValues);
  // }, [credential, form]);

  return (
    <div className="max-w-[70%] mx-auto px-5">
      <div className="flex justify-center items-center">
        <div className="w-full">
          <div className="mb-5 space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Welcome Back Man! 👋</h2>
            <p className="text-gray-600 text-sm">Enter Login Details</p>
          </div>
          {/* <div>
          <div className="flex justify-center gap-2 mb-5">
            <NLButton
              onClick={() => setCredential("tenant")}
              variant="outline"
              className={clsx(
                credential === "tenant" && "bg-primary-500 !text-white",
                "hover:bg-primary-600 hover:!text-white !text-[12px]"
              )}
            >
              Tenant Credentials
            </NLButton>
            <NLButton
              onClick={() => setCredential("landlord")}
              variant="outline"
              className={clsx(
                credential === "landlord" && "bg-primary-500 !text-white",
                "hover:bg-primary-600 hover:!text-white !text-[12px]"
              )}
            >
              Landlord Credentials
            </NLButton>
            <NLButton
              onClick={() => setCredential("admin")}
              variant="outline"
              className={clsx(
                credential === "admin" && "bg-primary-500 !text-white",
                "hover:bg-primary-600 hover:!text-white !text-[12px]"
              )}
            >
              Admin Credentials
            </NLButton>
          </div>
        </div> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <label className="text-sm">Email or Username</label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <Input {...field} value={field.value || ""} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <label className="text-sm">Password</label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        value={field.value || ""}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                      >
                        {showPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {typeof window !== "undefined" && (
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECHAPCHA_CLIENT_KEY!}
                  onChange={handleRecaptcha}
                />
              )}

              <NLButton
                variant="primary"
                className="w-full"
                disabled={reCaptchaStatus ? false : true}
                type="submit"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </NLButton>
              <p className="text-center text-sm">
                Do not have an account yet?{" "}
                <Link href="/register">
                  <span className="text-primary-500 font-semibold">
                    Create account
                  </span>
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
