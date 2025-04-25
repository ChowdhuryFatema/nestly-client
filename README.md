# Nestly - Client Side 🏡
**Frontend of BasaFinder (Smart Rental & Housing Solution)**  
Built with **Next.js + TypeScript + React**

## 📘 Project Overview
Nestly is a smart rental housing solution that connects **Landlords**, **Tenants**, and an **Admin** through a feature-rich platform. The client side is built with **Next.js** for fast performance and SSR capabilities.

## 🚀 Live Site

🌐 [Live Demo](https://your-frontend-link.vercel.app)

## 🔑 Features

### 🔐 Authentication
- JWT-based login & registration
- Role-based route access (Admin, Landlord, Tenant)

### 🎯 Core Pages
- **Home / Landing Page** with search, hero, testimonials, and call-to-action
- **Login / Register Pages** (User selects role: Landlord or Tenant)
- **All Listings** with filters (location, price, bedrooms)
- **About Us**, **FAQ**, **Contact**

### 💼 Dashboards
- **Admin Dashboard**: Manage users and listings
- **Landlord Dashboard**: Post, edit, delete listings, respond to rental requests
- **Tenant Dashboard**: Track rental requests, make payments when approved


## 🔍 Search & Filters
- Filter by:
  - Location
  - Price range
  - Number of bedrooms

## 💳 Payment Integration
- Stripe (payment button appears only when landlord approves)

## ✉️ Email Notifications
- Automated emails for rental request status updates

## 📱 Responsive Design
- Mobile-friendly interface
- Optimized for all screen sizes

## 🧪 Tech Stack
- **Framework**: Next.js
- **Language**: TypeScript
- **UI**: React
- **Routing**: Next Router
- **Auth**: JWT with context provider
- **CSS**: Custom CSS / Tailwind CSS
- **Payment**: Stripe integration

---

## 🧪 Admin Test Credentials

Use the following admin credentials to explore the Admin Dashboard:

- **Email:** admin@gmail.com 
- **Password:** $Admin123
---


## 🛠️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nestly.git
cd nestly/client

npm install
# or
yarn install
cp .env.example .env

# Copy the example environment file and create your own
npm run dev
# or
yarn dev
