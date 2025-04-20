"use client";

import { LucideIcon } from "lucide-react";
import {
  PlusSquare,
  List,
  MailOpen,
  UserCog,
  Users,
  Building2,
  LayoutDashboard,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Image from "next/image";
import logo from "@/app/assets/nestly-logo.png";
import Link from "next/link";
import { TUser } from "@/types";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/AuthService";

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: { title: string; url: string }[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [loading]);

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
      { title: "Dashboard", url: `/${user?.role}`, icon: LayoutDashboard },
      {
        title: "Manage All Users",
        url: `/${user?.role}/all-users`,
        icon: Users,
      },
      {
        title: "Manage All Rental Houses",
        url: `/${user?.role}/all-rental-houses`,
        icon: Building2,
      },
      { title: "Edit Profile", url: "/admin/update-profile", icon: UserCog },
    ];
  } else if (user?.role === "landlord") {
    data.navMain = [
      { title: "Dashboard", url: `/${user?.role}`, icon: LayoutDashboard },
      {
        title: "Create Rental",
        url: "/landlord/create-rental",
        icon: PlusSquare,
      },
      { title: "AllListings", url: "/landlord/AllListing", icon: List },
      { title: "Rental Requests", url: "/landlord/requests", icon: MailOpen },
      { title: "Edit Profile", url: "/landlord/update-profile", icon: UserCog },
    ];
  } else if (user?.role === "tenant") {
    data.navMain = [
      { title: "Dashboard", url: `/${user?.role}`, icon: LayoutDashboard },
      { title: "All Requests", url: "/tenant/all-request", icon: FileText },
      { title: "Edit Profile", url: "/tenant/update-profile", icon: UserCog },
    ];
  }
  return (
    <Sidebar {...props}>
      {/* <SidebarHeader>
        <Link href={"/"}>
          <h1 className="text-2xl font-black flex items-center">
            <Image src={logo} width={30} height={30} alt="Logo" />
            <span> Nestly</span>
          </h1>
        </Link>
      </SidebarHeader> */}

      <SidebarContent>
        <Link href={"/"}>
          <h1 className="text-2xl font-black flex items-center pt-5 pl-3">
            <Image
              src={logo}
              width={30}
              height={30}
              alt="Logo"
              className="mr-2"
            />
            <span> Nestly</span>
          </h1>
        </Link>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
