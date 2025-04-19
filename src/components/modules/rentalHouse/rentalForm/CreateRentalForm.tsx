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
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import NLButton from "@/components/ui/core/ImageUploader/NLButton";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "@/components/ui/core/ImageUploader";
import ImagePreviewer from "@/components/ui/core/ImageUploader/ImagePreview";
import { rentalSchema } from "./rentalValidation";
import { uploadImageToCloudinary } from "@/services/Cloudinary";
import { createRentalHouse } from "@/services/ListingService";
import { TRentalHouse } from "@/types/RentalHouse.type";

const CreateRentalForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
        location: "",
        rentAmount: "",
        bedrooms: "",
        description: "",
    },
  }); 


  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);

    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
      try {
        const upLoadedImagesUrls = [];
        for (const image of imageFiles) {
          const res = await uploadImageToCloudinary(image);
          console.log(res);
          upLoadedImagesUrls.push(res?.url);
        }
        const rentalHouseData: TRentalHouse = {
          ...data,
          location: data.location,
          description: data.description,
          rentAmount: String(data.rentAmount),
          bedrooms: String(data.bedrooms),
          images: upLoadedImagesUrls,
        }
        console.log("rentalHouseData", rentalHouseData);
        const res = await createRentalHouse(rentalHouseData);
        console.log(res);
        if (res?.success) {
          toast.success(res?.message);
          form.reset();
          setImageFiles([]);
          setImagePreview([]);
        } else {
          toast.error(res?.message);
        }
      } catch (error: any) {
        console.error(error);
      }

  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-center items-center">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4">Create Rental House</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <label className="text-md">Location</label>
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
              <label className="text-md">Rent amount</label>
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
              <label className="text-md">Number of bedrooms</label>
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
              

              <div className="col-span-2">
                <label className="text-md">Description</label>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <Textarea className="h-24" {...field} value={field.value || ""} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <div className="space-y-2">
                <FormLabel className="text-md">Upload Images</FormLabel>
                <ImageUploader
                  setImageFiles={setImageFiles!}
                  setImagePreview={setImagePreview}
                  label="Upload Images"
                />
              </div>

              <div>
                {imagePreview.length > 0 && (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    className=" flex flex-wrap gap-2"
                  />
                )}
              </div>
              <NLButton variant="primary" className="w-full" type="submit">
                {isSubmitting ? "Submitting..." : "Submit"}
              </NLButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateRentalForm;
