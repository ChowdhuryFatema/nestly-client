"use client";

import logo from "@/app/assets/nestly-logo.png";
import { LogOut } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
// import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constants";
import Image from "next/image";
import NLButton from "../ui/core/ImageUploader/NLButton";

export default function Navbar() {
  // const { user, setLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    // setLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/all-rental", label: "All Listings Rental" },
  ];

  const user = {
    role: "admin"
  }

  return (
    <header className="border-b w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <h1 className="text-3xl font-black flex items-center">
          <Image src={logo} width={50} height={50} alt="Logo" />
          <span> Nestly</span>
        </h1>
        <div className="max-w-md  flex-grow">
          <ul className="flex justify-center space-x-6 text-sm text-gray-800 font-medium my-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-primary-500 font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <nav className="flex gap-2">
          <Link href={"/login"}>
            <NLButton>Login</NLButton>
          </Link>
          <Link href={"/register"}>
            <NLButton>Register</NLButton>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none cursor-pointer">
              <Avatar className="border-2 border-primary-500 rounded-full">
                <AvatarImage src="https://s.cafebazaar.ir/images/icons/cute.love.dp-fc9c8497-522b-4848-bd66-72ee57b9d195_512x512.png?x-img=v1/resize,h_256,w_256,lossless_false/optimize" />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link href={`/${user.role}`}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogOut}
                className="cursor-pointer text-red-500"
              >
                <LogOut /> <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* {user ? (
            <>
              <Link href={"/create-shop"}>
                <Button className="cursor-pointer">Create Shop</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>My Shop</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogOut}
                    className="cursor-pointer text-red-500"
                  >
                    <LogOut /> <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href={"/login"}>
              <Button className="cursor-pointer">Login</Button>
            </Link>
          )} */}
        </nav>
      </div>
    </header>
  );
}
