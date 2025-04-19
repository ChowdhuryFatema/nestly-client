"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
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


const RequestRentalModal = ({ rentalHouseId, landlordId }: { rentalHouseId: string, landlordId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRentalRequest>();

  const onSubmit = async (data: TRentalRequest) => {
    const newData = {
      rentalHouseId,
      landlordId,
      ...data,
    };

    console.log("Rental Request:", newData);

    try {
      const res = await createTenantRequest(newData); // Assuming this returns a Response object
      //   const result = await res.json();
      console.log("Server Response:", res);
      if (res.success) {
        toast.success(res.message);
        reset();
        setIsOpen(false);
      } else {
        toast.error(res.message);
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
            <Input
              id="moveInDate"
              type="date"
              {...register("moveInDate", {
                required: "Move-in date is required",
              })}
              className="mt-1 w-full"
            />
            {errors.moveInDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.moveInDate.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="rentalDuration">Rental Duration</Label>
            <Input
              id="rentalDuration"
              placeholder="6 months"
              {...register("rentalDuration", {
                required: "Duration is required",
              })}
              className="mt-1 w-full"
            />
            {errors.rentalDuration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rentalDuration.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Special Requirements</Label>
            <Textarea
              id="message"
              placeholder="Any special needs or notes..."
              {...register("message", {
                required: "Message is required",
              })}
              className="mt-1 w-full"
            />
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
