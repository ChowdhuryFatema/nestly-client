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
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter, useSearchParams } from "next/navigation";
import NLButton from "@/components/ui/core/ImageUploader/NLButton";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "fatema@gmail.com",
      password: "123456",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);

        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/profile");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleRecaptcha = async (value: string | null) => {
    console.log(value);
    try {
      const res = await reCaptchaTokenVerification(value!);

      if (res?.success) {
        setReCaptchaStatus(true);
      }

      console.log("res", res);
    } catch (error: any) {
      throw Error(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <div className="mb-5 space-y-2 text-center">
          <h2 className="text-2xl font-semibold">Welcome Back Man! 👋</h2>
          <p className="text-gray-600 text-sm">Enter Login Details</p>
        </div>
        <div>
          <div className="flex justify-center gap-2 mb-5">
            <NLButton
              variant="outline"
              className="hover:bg-primary-600 hover:!text-white !text-[12px]"
            >
              tenant
            </NLButton>
            <NLButton
              variant="outline"
              className="hover:bg-primary-600 hover:!text-white !text-[12px]"
            >
              landlord Credentials
            </NLButton>
            <NLButton
              variant="outline"
              className="hover:bg-primary-600 hover:!text-white !text-[12px]"
            >
              Admin Credentials
            </NLButton>
          </div>
        </div>
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
                  <Input {...field} type="password" value={field.value || ""} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECHAPCHA_CLIENT_KEY!}
              onChange={handleRecaptcha}
            />
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
  );
};

export default LoginForm;
