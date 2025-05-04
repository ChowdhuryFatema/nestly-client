"use client"

import { FaLightbulb, FaHome, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const tipsData = [
  {
    icon: <FaLightbulb size={50} className="text-orange-500" />,
    title: "Inspect Before You Rent",
    description:
      "Check the plumbing, electricity, and overall condition before signing. Avoid future repair surprises.",
  },
  {
    icon: <FaHome size={50} className="text-green-600" />,
    title: "Know Your Neighborhood",
    description:
      "Research schools, markets, transport, and safety. A great home includes a great community.",
  },
  {
    icon: <FaHandshake size={50} className="text-blue-500" />,
    title: "Understand the Agreement",
    description:
      "Read the contract. Know your rights, responsibilities, and lease terms before signing.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, type: "spring" },
  }),
};

const Tips = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          Smart Renting Tips 🧠
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Expert guidance to help renters and landlords make smarter, more confident property decisions.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {tipsData.map((tip, idx) => (
            <motion.div
              key={idx}
              className="bg-white shadow-2xl rounded-2xl p-8 hover:scale-105 hover:shadow-3xl transition-transform duration-300"
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="mb-6 flex justify-center">{tip.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">{tip.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{tip.description}</p>
              <span className="text-sm text-gray-400 mt-2 block">Updated: March 2025</span>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Rent Smarter?</h2>
          <p className="text-lg text-gray-600 mb-6">
  Discover your next home or become a trusted landlord today. 
  Whether you&apos;re searching for the perfect place to call home or looking to offer a great rental experience to tenants, 
  we make the process simple and efficient. Explore a wide variety of listings and find the ideal property to suit your needs.
</p>

         <Link href="/all-listings-rental">
         <button className="bg-primary-500 hover:bg-green-700 text-white px-6 py-3 rounded-full transition duration-300 cursor-pointer">
            Explore Listings
          </button></Link>
        </div>

        {/* FAQs */}
        <div className="mt-24">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-gray-100 p-4 rounded-md">
              <summary className="font-semibold text-gray-700 cursor-pointer">How can I verify a landlord&apos;s credibility?</summary>
              <p className="mt-2 text-gray-600">Request legal property documents, check online reviews, and speak with past tenants.</p>
            </details>
            <details className="bg-gray-100 p-4 rounded-md">
              <summary className="font-semibold text-gray-700 cursor-pointer">Is rent negotiation possible?</summary>
              <p className="mt-2 text-gray-600">Absolutely. Especially in slower markets or for longer lease commitments.</p>
            </details>
          </div>
        </div>

        {/* Social Share */}
        <div className="mt-10 flex justify-center space-x-4">
        <button
  className="text-green-600 hover:underline cursor-pointer"
  onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank')}
>
  Share on Facebook
</button>

<button
  className="text-green-600 hover:underline cursor-pointer"
  onClick={() => window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href), '_blank')}
>
  Tweet
</button>

        </div>
      </div>
    </div>
  );
};

export default Tips;