Nestly - Client Side 🏡

Frontend of BasaFinder (Smart Rental & Housing Solution)
Built with Next.js + TypeScript + React

📘 Project Overview

Nestly is a smart rental housing solution that connects Landlords, Tenants, and an Admin through a feature-rich platform. The client side is built with Next.js for fast performance and SSR capabilities.

🚀 Live Site

🌐 Live Demo

🔑 Features

🔐 Authentication

JWT-based login & registration

Role-based route access (Admin, Landlord, Tenant)

🎯 Core Pages

Home / Landing Page with search, hero, testimonials, and call-to-action

Login / Register Pages (User selects role: Landlord or Tenant)

All Listings with filters (location, price, bedrooms)

About Us, FAQ, Contact

💼 Dashboards

Admin Dashboard: Manage users and listings

Landlord Dashboard: Post, edit, delete listings, respond to rental requests

Tenant Dashboard: Track rental requests, make payments when approved

🔍 Search & Filters
Filter by:

Location

Price range

Number of bedrooms

💳 Payment Integration

Stripe (payment button appears only when landlord approves)

✉️ Email Notifications

Automated emails for rental request status updates

📱 Responsive Design

Mobile-friendly interface

Optimized for all screen sizes

🧪 Tech Stack
Framework: Next.js

Language: TypeScript

UI: React

Routing: Next Router

Auth: JWT with context provider

CSS: Custom CSS / Tailwind CSS

Payment: Stripe integration

🧪 Admin Test Credentials

Use the following admin credentials to explore the Admin Dashboard:

Email: admin@gmail.com

Password: $Admin123

🛠️ Setup & Installation

1. Clone the Repository
2. 
bash

git clone https://github.com/ChowdhuryFatema/nestly-client.git

cd nestly/client

npm install

# or
yarn install
cp .env.example .env
Copy the example environment file and create your own:

bash

npm run dev

# or

yarn dev

The app will be running locally at http://localhost:3000.

🚀 Future Plans 

User Reviews and Ratings: Allow tenants to rate and review listings to help future renters make informed decisions.

Listing Search Enhancements: Improve search filters to include more granular options like property type, pet-friendly, parking availability, etc.

Multi-language Support: Implement support for multiple languages to cater to a global audience.

Admin Dashboard Enhancements: Add more features to the admin dashboard, such as managing reports, viewing site analytics, and handling dispute resolution between landlords and tenants.

Tenant and Landlord Chat: Introduce real-time chat functionality to facilitate communication between tenants and landlords.

Improved Payment System: Integrate more payment options for tenants (PayPal, bank transfer, etc.), and offer subscription plans for landlords with premium features.

Automated Reviews and Feedback: Allow tenants to leave feedback automatically after a rental is approved or rejected.

