"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { CartContext } from "../AppContext";
import { useContext } from "react";
import { CgShoppingCart } from "react-icons/cg";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);

  if (userName?.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-primary/90">
        <Link href="/" className="text-primary font-semibold text-2xl">
          HenoFood
        </Link>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>

      {status === "authenticated" && (
        <div className="flex items-center gap-4">
          <Link href="/profile" className="text-primary/90">
            Hello, {userName}
          </Link>
          <Button
            onClick={() => signOut()}
            className="bg-primary text-white px-5 py-1 rounded-lg"
          >
            Logout
          </Button>
        </div>
      )}

      {status === "unauthenticated" && (
        <>
          <nav className="flex gap-4 items-center ">
            <Link href="/login">Login</Link>
            <Link
              href="/register"
              className="bg-primary text-white px-5 py-1 rounded-md"
            >
              Register
            </Link>
          </nav>
        </>
      )}

      <Link href="/cart" className=" relative flex items-center gap-2">
        <CgShoppingCart size={30} />

        <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full p-1 leading-3 ">
          {cartProducts.length}
        </span>
      </Link>
    </header>
  );
}
