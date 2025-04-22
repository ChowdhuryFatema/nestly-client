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
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import NLButton from "@/components/ui/core/ImageUploader/NLButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      if (res?.success) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[70%] mx-auto">
      <div className="flex justify-center items-center">
        <div className="w-full">
          <div className="mb-5 space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Hi, Get Started Now 👋</h2>
            <p className="text-gray-600 text-sm">
              Enter details to create your Trek Tales account
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <div>
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
              </div>
              <div>
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
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="text-sm">Phone Number</label>
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <Input
                        {...field}
                        type="number"
                        value={field.value || ""}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
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
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
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
              </div>
              <div>
                <label className="text-sm">Confirm Password</label>
                <label className="text-sm">Confirm Password</label>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          value={field.value || ""}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showConfirmPassword ? (
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
              </div>
              <div>
                <label className="text-sm">Select Role</label>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <div className="flex gap-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="landlord"
                            checked={field.value === "landlord"}
                            onChange={field.onChange}
                          />
                          <span>Landlord</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="tenant"
                            checked={field.value === "tenant"}
                            onChange={field.onChange}
                          />
                          <span>Tenant</span>
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <NLButton
                  variant="primary"
                  className="w-full"
                  disabled={!!confirmPassword && password !== confirmPassword}
                  type="submit"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </NLButton>
                <p className="text-center text-sm mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary-500 font-semibold "
                  >
                    Login Now
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
