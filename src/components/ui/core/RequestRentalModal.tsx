"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import NLButton from "./ImageUploader/NLButton";
import { createTenantRequest } from "@/services/TenantService";
import { TRentalRequest } from "@/types";
import { toast } from "sonner";

const RequestRentalModal = ({ rentalHouseId }: { rentalHouseId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TRentalRequest>();

  const onSubmit = async (data: TRentalRequest) => {
    const newData = {
      rentalHouseId,
      ...data,
    };

    console.log("Rental Request:", newData);

    try {
      const res = await createTenantRequest(newData);
      console.log("Server Response:", res);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }

      reset(); // Clear form
      setIsOpen(false); // Close modal
    } catch (error) {
      console.error("Error creating tenant request:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <NLButton variant="primary">Request Rental</NLButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rental Request Form</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="moveInDate">Move-in Date</Label>
            <Controller
              name="moveInDate"
              control={control}
              rules={{ required: "Move-in date is required" }}
              render={({ field }) => (
                <Input
                  id="moveInDate"
                  type="date"
                  className="mt-1 w-full"
                  {...field}
                />
              )}
            />
            {errors.moveInDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.moveInDate.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="rentalDuration">Rental Duration</Label>
            <Controller
              name="rentalDuration"
              control={control}
              rules={{ required: "Duration is required" }}
              render={({ field }) => (
                <Input
                  id="rentalDuration"
                  placeholder="6 months"
                  className="mt-1 w-full"
                  {...field}
                />
              )}
            />
            {errors.rentalDuration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rentalDuration.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Special Requirements</Label>
            <Controller
              name="message"
              control={control}
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <Textarea
                  id="message"
                  placeholder="Any special needs or notes..."
                  className="mt-1 w-full"
                  {...field}
                />
              )}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <NLButton type="submit" variant="primary" className="w-full">
            Submit Request
          </NLButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestRentalModal;
