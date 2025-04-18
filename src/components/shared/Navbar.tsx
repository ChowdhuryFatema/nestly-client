"use client";

import logo from "@/app/assets/nestly-logo.png";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constants";
import Image from "next/image";
import NLButton from "../ui/core/ImageUploader/NLButton";
import clsx from "clsx";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

export default function Navbar() {
  const { user, setLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/all-rental", label: "All Listings Rental" },
  ];

   useEffect(() => { console.log("user",user)}, [])

console.log("user user", user)


  return (
    <header className="border-b w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
          <Image src={logo} width={30} height={40} alt="Logo" />
          <span>Nestly</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-6 text-sm text-gray-800 font-medium">
            {navLinks.map((link) => (
              <li
                key={link.href}
                className={clsx(
                  pathname === link.href && "text-primary-500",
                  "font-bold"
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center">
          {/* Desktop Buttons + Dropdown */}
          <nav className="md:flex gap-2 items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none cursor-pointer">
                  <Avatar className="border-2 border-primary-500 rounded-full">
                    <AvatarImage src="https://s.cafebazaar.ir/images/icons/cute.love.dp-fc9c8497-522b-4848-bd66-72ee57b9d195_512x512.png" />
                    <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={`/${user?.role}`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogOut}
                    className="cursor-pointer text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href={"/login"}>
                  <NLButton className="mr-2 text-sm">Login</NLButton>
                </Link>
                <Link href={"/register"}>
                  <NLButton>Register</NLButton>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-52">
                <div className="space-y-4 mt-4 p-5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        pathname === link.href && "text-primary-500",
                        "block text-sm font-semibold"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
