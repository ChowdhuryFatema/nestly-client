"use client";

import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { TRentalRequest } from "@/types/RentalHouse.type";
import { useUser } from "@/context/UserContext";
import { createPaymentIntent } from "@/services/payment";


const CheckoutForm = ({ info }: { info: TRentalRequest }) => {
    console.log({ info })
    const router = useRouter();
    const stripe = useStripe();
    const { user } = useUser();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardNumberElement);

        if (!card) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message || "An error occurred");
            setLoading(false);
            return;
        }

        if (!user) {
            toast.error("Please login to continue");
            router.push("/login");
            setError("");
            setLoading(false);
            return;
        }

        const paymentInfo = {
            tenantId: info?.tenantId,
            rentalHouseId: info?.rentalHouseId,
            landlordId: info?.landlordId,
            amount: String(Number(info?.rentalHouseId?.rentAmount) + 15),
        }

        const response = await createPaymentIntent(paymentInfo);
        console.log({ response });
        if (!response?.success) {
            toast.error(`${response?.message}`, {
                duration: 1500,
                style: {
                    background: "#f87171",
                    color: "#fff",
                }
            });
            setLoading(false);
            setError("");
            redirect("/login");
            return;
        }
        const { clientSecret } = response?.data;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email,
                },
            },
        });

        if (paymentResult.error) {
            toast.error(paymentResult.error.message);
            setLoading(false);
        } else if (paymentResult.paymentIntent.status === "succeeded") {
            const response = await confirmPayment({
                transactionId: paymentResult.paymentIntent.id,
                planName: plan.name,
                amount: plan.total,
                userEmail: user.email,
            });
            if (!response?.success) {
                toast.error(response?.message);
                setError(response?.message);
                setLoading(false);
                return;
            }
            toast.success("Payment successful", {
                duration: 1500,
                style: {
                    background: "#10b981",
                    color: "#fff",
                }
            });
            setError("");
            setLoading(false);
        }

        console.log(paymentResult);

        setLoading(false);
    }


    return (
        <div className=" mx-auto bg-neutral-50  rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Card Number */}
                <label className="block text-gray-700">Card Number</label>
                <div className="border border-gray-300 p-2 rounded-lg flex items-center">
                    <CardNumberElement className="w-full p-2 outline-none" />
                </div>

                {/* Expiry Date & CVV */}
                <div className="flex gap-4">
                    <div className="w-1/2 space-y-2">
                        <label className="block text-gray-700">Expiry Date</label>
                        <div className="border border-gray-300 p-2 rounded-lg">
                            <CardExpiryElement className="w-full p-2 outline-none" />
                        </div>
                    </div>
                    <div className="w-1/2 space-y-2">
                        <label className="block text-gray-700">CVV</label>
                        <div className="border border-gray-300 p-2 rounded-lg">
                            <CardCvcElement className="w-full p-2 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Name on Card */}
                <label className="block text-gray-700">Name on Card</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className={
                        `w-full mt-4 px-4 py-2 text-white font-semibold rounded-lg transition 
                        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-neutral-800 hover:bg-neutral-900"
                        }`}
                >
                    {loading ? "Processing..." :
                        <span className="flex items-center gap-2 w-full justify-center">
                            <LockKeyhole className="w-4 h-4" />
                            Pay Now
                        </span>}
                </button>
            </form>
        </div>
    )
}

export default CheckoutForm;
