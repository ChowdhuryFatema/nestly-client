import { stripePromise } from "@/lib/stripe";
import { TRentalRequest } from "@/types/RentalHouse.type";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export default function Payment({ request }: { request: TRentalRequest }) {
    return (
        <div className='container mx-auto px-4 py-10'>
            <div className='bg-white p-8 rounded-lg border mb-8'>
                <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
                <div className=''>
                    <div className=''>
                        <div className='w-full'>
                            <div className="space-y-4">
                                <div className="bg-neutral-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between">
                                            <span>Professional Plan</span>
                                            <span>$ {Number(request?.rentalHouseId?.rentAmount)}</span>
                                        </div>
                                        <div className="flex justify-between text-neutral-600">
                                            <span>Tax</span>
                                            <span>${15}</span>
                                        </div>
                                        <div className="border-t pt-2 mt-2">
                                            <div className="flex justify-between font-semibold">
                                                <span>Total</span>
                                                <span>${15 + Number(request?.rentalHouseId?.rentAmount)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className='w-full'>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm info = {request} />
                            </Elements>
                        </div>

                    </div>



                </div>


            </div>
        </div>
    );
}


