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
// import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import NLButton from "@/components/ui/core/ImageUploader/NLButton";
import { Textarea } from "@/components/ui/textarea";
// import { rentalSchema } from "./rentalValidation";

const CreateRentalForm = () => {
  const form = useForm({
    // resolver: zodResolver(rentalSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;



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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <label className="text-sm">Location</label>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <Input {...field} value={field.value || ""} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <label className="text-sm">Rent amount</label>
              <FormField
                control={form.control}
                name="rent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <Input {...field} value={field.value || ""} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <label className="text-sm">Number of bedrooms</label>
              <FormField
                control={form.control}
                name="numberOfBedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <Input type="number" {...field} value={field.value || ""} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <label className="text-sm">Amenities</label>
              <FormField
                control={form.control}
                name="amenities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <Input {...field} value={field.value || ""} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <label className="text-sm">Description</label>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <Textarea {...field} value={field.value || ""} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <NLButton
                variant="primary"
                className="w-full"
                type="submit"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </NLButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateRentalForm;
