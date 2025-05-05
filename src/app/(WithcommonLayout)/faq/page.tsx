"use client";
import { useState } from 'react';

const faqs = [
  {
    question: "What is Nestly?",
    answer: "Nestly is a smart platform to find and list rental homes, apartments, and flats easily with verified information and secure user interaction."
  },
  {
    question: "How do I list my property?",
    answer: "You can register an account and go to the 'Add Listing' page from your dashboard to submit property details, images, and pricing."
  },
  {
    question: "Is there any cost to use Nestly?",
    answer: "Browsing is completely free. Listing charges may apply for premium visibility or promoted listings."
  },
  {
    question: "How can I contact a property owner?",
    answer: "Once you find a property you’re interested in, you can use the 'Contact Owner' button to send a message or call the provided number."
  },
  {
    question: "How can I ensure the property is real?",
    answer: "We verify all listings and allow user reviews, but we also recommend visiting the property in person before any transaction."
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-12">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-semibold text-lg text-gray-800">
                  {faq.question}
                </span>
                <span className="text-xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
