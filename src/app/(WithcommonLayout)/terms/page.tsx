'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  Lock,
 
  AlertTriangle,
  CreditCard,
  CalendarClock,
} from 'lucide-react'

const terms = [
  {
    title: 'User Responsibilities',
    icon: <ShieldCheck className="text-green-600 w-6 h-6 mr-2" />,
    content:
      'Users must provide accurate and truthful information. Misleading or false information may result in account suspension or removal.',
  },
  {
    title: 'Privacy & Security',
    icon: <Lock className="text-blue-600 w-6 h-6 mr-2" />,
    content:
      'Your data is encrypted and securely stored. We do not share your personal details with any third party without consent.',
  },
  {
    title: 'Listing Policy',
    icon: <AlertTriangle className="text-yellow-600 w-6 h-6 mr-2" />,
    content:
      'All listings must be legal and verified. Fraudulent or suspicious listings are strictly prohibited and may lead to legal action.',
  },
  {
    title: 'Payment & Refund',
    icon: <CreditCard className="text-purple-600 w-6 h-6 mr-2" />,
    content:
      'Payments are processed through secure gateways. Refund policies depend on property owner terms. BaaFinder acts as a mediator if issues arise.',
  },
  {
    title: 'Modification of Terms',
    icon: <CalendarClock className="text-pink-600 w-6 h-6 mr-2" />,
    content:
      'We may update these terms occasionally. Users will be notified via email or in-app notification if significant changes are made.',
  },
]

export default function TermsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-16">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-lg">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8 flex items-center justify-center gap-2">
          📜 Terms & Conditions
        </h1>

        <div className="space-y-4">
          {terms.map((term, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-sm bg-white"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center font-medium text-lg">
                  {term.icon}
                  {term.title}
                </div>
                <span className="text-xl text-gray-500">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div
                className={`transition-all duration-300 px-4 pb-4 text-gray-700 ${
                  openIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                }`}
              >
                <p className="pt-2">{term.content}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-center text-gray-500">
          Last updated: May 6, 2025
        </p>
      </div>
    </div>
  )
}
