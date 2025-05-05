"use client";

import { subscribeToNewsletter } from "@/services/NewsLetterService";
import { useState } from "react";

import { FiMail } from "react-icons/fi";

const NewsLetterForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email." });
      return;
    }

    try {
      const res = await subscribeToNewsletter({ email });
      if (res?.success) {
        setMessage({ type: "success", text: "Thanks for subscribing!" });
        setEmail("");

        //Hide message after 2 seconds
        setTimeout(()=> setMessage(null), 2000);
      } else {
        throw new Error(res?.message || "Subscription failed.");
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error?.message || "Something went wrong." });
      setTimeout(()=> setMessage(null), 2000);
    }
  };

  return (
    <div className="bg-white text-black py-10 px-4 rounded-lg shadow-lg max-w-3xl mx-auto text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-500 text-white p-3 rounded-full">
            <FiMail size={28} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase">Sign up for newsletters</h2>
            <p className="text-sm sm:text-base ">
              Be the First to Know. Sign up for newsletter today.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:w-96 px-4 py-3 rounded-md text-black focus:outline-none border-2  focus:border-green-500 transition-colors"
          required
        />
        <button
          type="submit"
          className="bg-primary-500 hover:bg-green-500 transition-colors px-6 py-3 rounded-md text-white font-bold uppercase cursor-pointer"
        >
          Subscribe
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 ${
            message.type === "success" ? "text-green-400" : "text-red-400"
          } text-sm sm:text-base`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default NewsLetterForm;
