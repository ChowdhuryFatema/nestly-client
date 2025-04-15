/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import NLButton from "@/components/ui/core/ImageUploader/NLButton";
import { Textarea } from "@/components/ui/textarea";
import ImagePreviewer from "@/components/ui/core/ImageUploader/ImagePreview";
import ImageUploader from "@/components/ui/core/ImageUploader";

interface RentalHouseFormProps {
  defaultValues?: {
    location?: string;
    rentAmount?: number;
    bedrooms?: number;
    amenities?: string;
    description?: string;
    images?: string[];
    available?: boolean;
  };
}

const CreateRentalForm = ({ defaultValues }: RentalHouseFormProps) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm({
    defaultValues: defaultValues || {},
  });

  console.log("imageFiles", imageFiles);

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Assuming you're calling an API to register the rental listing
      // const res = await registerUser(data);
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
    <div className="max-w-[90%] mx-auto">
      <div className="flex justify-center items-center">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {/* First row: Location and Rent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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
                </div>
                <div>
                  <label className="text-sm">Rent amount</label>
                  <FormField
                    control={form.control}
                    name="rentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel />
                        <Input {...field} value={field.value || ""} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Second row: Bedrooms and Amenities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Number of bedrooms</label>
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel />
                        <Input type="number" {...field} value={field.value || ""} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
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
                </div>
              </div>

              {/* Third row: Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="text-sm">Description</label>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel />
                        <Textarea className="h-36" {...field} value={field.value || ""} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="mt-8">
                <ImageUploader
                  setImageFiles={setImageFiles!}
                  setImagePreview={setImagePreview}
                  label="Upload Images"
                />
              </div>

              {/* Image Preview */}
              <div>
                {imagePreview.length > 0 && (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    className="grid grid-cols-7 gap-2"
                  />
                )}
              </div>

              {/* Submit Button */}
              <NLButton variant="primary" className="w-full" type="submit">
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
