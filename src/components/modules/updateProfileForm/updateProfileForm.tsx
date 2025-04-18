/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { updateProfile } from "@/services/Users"; 
import { getCurrentUser } from "@/services/AuthService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { User, Phone, Eye, EyeOff } from "lucide-react";

export default function UpdateProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    profileImage: "",
    currentPassword: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrentUser();
        setFormData(prev => ({
          ...prev,
          username: data.name || "",
          phone: data.phone || "",
          profileImage: data.profileImage || "", 
        }));
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateProfile(formData);
      toast.success(res.message || "Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const profileImageSrc =
    formData.profileImage?.trim() !== "" ? formData.profileImage : "/default-avatar.png";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24">
            <Image
              src={profileImageSrc}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full object-cover w-full h-full border border-gray-300 shadow"
            />
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              name="username"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              className="pl-10 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="pl-10 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Profile Image URL */}
          <input
            name="profileImage"
            placeholder="Profile Image URL"
            value={formData.
                profileImage}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 md:col-span-2"
          />

          {/* Current Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* New Password with toggle */}
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div
              onClick={() => setShowNewPassword(prev => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#62a812] text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
