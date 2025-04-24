"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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
import { TRentalHouse, TRentalRequest } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "../../../context/UserContext";

type RentalFormValues = {
  rentalHouseId: string;
  landlordId: string;
  moveInDate: string;
  rentalDuration: string;
  message: string;
};


const RequestRentalModal = ({ rentalHouse }: { rentalHouse: TRentalHouse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { user, loading } = useUser();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RentalFormValues>();


  const onSubmit: SubmitHandler<RentalFormValues> = async (data) => {
    const newData = {
      ...data,
      rentalHouseId: rentalHouse?._id as string,
      landlordId: rentalHouse?.landlord,
    };

    console.log({newData});
    try {
      const res = await createTenantRequest(newData as unknown as TRentalRequest);
      console.log({res});

      if (res.success) {
        toast.success(res.message);
        reset();
        setIsOpen(false);
        router.push("/all-listings-rental");
      } else {
        toast.error(res.message);
        reset(); // Clear form
        setIsOpen(false); // Close modal
      }
    } catch (error) {
      console.error("Error creating tenant request:", error);
    }
  };

  const handleRentalRequest = async () => {
    if (user) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      router.push("/login");
    }
  };

  useEffect(() => {
  }, [user]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <NLButton
          disabled={loading}
          variant="primary"
          onClick={handleRentalRequest}
        >
          Request Rental
        </NLButton>
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
                  value={field.value || ""}
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
                  value={field.value || ""}
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
                  value={field.value || ""}
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
