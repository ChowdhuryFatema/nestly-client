"use client";

import * as React from "react";
import { BookOpen, Bot, LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Image from "next/image";
import logo from "@/app/assets/nestly-logo.png";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: { title: string; url: string }[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const data: {
    user: {
      name: string;
      email: string;
      avatar: string;
    };
    navMain: NavItem[];
  } = {
    user: {
      name: user?.name || "Guest",
      email: user?.email || "",
      avatar: "",
    },
    navMain: [],
  };

  if (user?.role === "admin") {
    data.navMain = [
      {
        title: "All Users",
        url: "/all-users",
        icon: Bot,
        // items: [
        //   { title: "Explorer", url: "#" },
        //   { title: "Explorer", url: "#" },
        //   { title: "Quantum", url: "#" },
        // ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          { title: "Introduction", url: "#" },
          { title: "Get Started", url: "#" },
          { title: "Tutorials", url: "#" },
          { title: "Changelog", url: "#" },
        ],
      },
    ];
  } else if (user?.role === "landlord") {
    data.navMain = [
      {
        title: "Listings",
        url: "#",
        icon: BookOpen,
        items: [
          { title: "AllListings", url: "/landlord/AllListing" },
          { title: "Rental Requests", url: "/landlord/requests" },
        ],
      },
    ];
  } else if (user?.role === "tenant") {
    data.navMain = [
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          { title: "Get Started", url: "#" },
          { title: "Tutorials", url: "#" },
        ],
      },
    ];
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={"/"}>
          <h1 className="text-2xl font-black flex items-center">
            <Image src={logo} width={30} height={30} alt="Logo" />
            <span> Nestly</span>
          </h1>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
