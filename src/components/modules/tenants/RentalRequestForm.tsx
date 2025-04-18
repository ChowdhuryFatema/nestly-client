'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { createTenantRequest } from "@/services/tenants/tenantservice";


type TRentalRequestFormInput = {
  rentalHouseId: string;
  message: string;
  landlordPhone?: string;

};

const RentalRequestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TRentalRequestFormInput>();

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const onSubmit: SubmitHandler<TRentalRequestFormInput> = async (data : any) => {
   
    const res = await createTenantRequest(data);
    setLoading(false);
   console.log("rental,,,,", res);
    if (res?.success) {
      setResponse("Rental request submitted successfully!");
      reset();
    } else {
      setResponse("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Rental Request Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Rental House ID */}
        <div>
          <label className="block mb-1 font-medium">Rental House ID</label>
          <input
            type="text"
            {...register("rentalHouseId", { required: "Rental House ID is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter Rental House ID"
          />
          {errors.rentalHouseId && (
            <p className="text-red-500 text-sm">{errors.rentalHouseId.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your message to the landlord..."
            rows={4}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

    

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>

        {/* Response Message */}
        {response && (
          <p className={`text-center text-sm mt-4 ${response.includes("successfully") ? "text-green-600" : "text-red-500"}`}>
            {response}
          </p>
        )}
      </form>
    </div>
  );
};

export default RentalRequestForm;
