"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { CartContext } from "../AppContext";
import { useContext, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { MenuIcon } from "lucide-react";
import Image from "next/image";

interface AuthLinksProps {
  status: string;
  username: string | null | undefined;
}

function AuthLinks({ status, username }: AuthLinksProps) {
  if (status === "authenticated") {
    return (
      <>
        <Link href="/profile" className="text-primary">
          Hello, {username}
        </Link>
        <Button onClick={() => signOut()} className="bg-primary text-white">
          Logout
        </Button>
      </>
    );
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Link href="/login" className="text-primary">
          Login
        </Link>
        <Link href="/register" className="text-primary">
          Signup
        </Link>
      </>
    );
  }
}
export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext) || { cartProducts: [] };
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (userName?.includes(" ")) {
    userName = userName?.split(" ")[0];
  }
  return (
    <header>
      <div className="flex md:hidden justify-between items-center">
        <Link href="/" className="text-primary font-semibold text-2xl">
          <Image
            src="/logo.png"
            alt=""
            width="60"
            height="60"
            className="rounded-full"
          />
        </Link>
        <div className="flex items-center justify-center">
          <Link href="/cart" className=" relative flex items-center gap-2">
            <CgShoppingCart size={30} />

            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full p-1 leading-3 ">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <Button
            className="text-black"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <MenuIcon size={30} />
          </Button>
        </div>
      </div>

      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
        >
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <AuthLinks status={status} username={userName} />
        </div>
      )}

      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link href="/" className="text-primary font-semibold text-2xl">
            HenoFood
          </Link>
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} username={userName} />
          <Link href="/cart" className=" relative flex items-center gap-2">
            <CgShoppingCart size={24} />

            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full p-1 leading-3 ">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
