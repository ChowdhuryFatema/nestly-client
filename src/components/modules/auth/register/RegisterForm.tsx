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
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import NLButton from "@/components/ui/core/ImageUploader/NLButton";
import Link from "next/link";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[60%] mx-auto">
      <div className="flex justify-center items-center">
        <div className="w-full">
          <div className="mb-5 space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Hi, Get Started Now 👋</h2>
            <p className="text-gray-600 text-sm">
              Enter details to create your Trek Tales account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <label className="text-sm">Full Name</label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <Input {...field} value={field.value || ""} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <label className="text-sm">Email</label>
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
              <label className="text-sm">Confirm Password</label>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <Input  type="password" {...field} value={field.value || ""} />
                    {confirmPassword && password !== confirmPassword ? (
                      <FormMessage>Password Dose not match</FormMessage>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />

              <NLButton
                variant="primary"
                className="w-full"
                disabled={!!confirmPassword && password !== confirmPassword}
                type="submit"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </NLButton>
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary-500 font-semibold ">
                  Login Now
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
