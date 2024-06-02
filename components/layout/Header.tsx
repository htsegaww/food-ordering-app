"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
export default function Header() {
  const session = useSession();
  const status = session.status;
  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-primary/90">
        <Link href="/" className="text-primary font-semibold text-2xl">
          HenoFood
        </Link>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {status === "authenticated" && (
        <Button
          onClick={() => signOut()}
          className="bg-primary text-white px-5 py-1 rounded-md"
        >
          Logout
        </Button>
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
    </header>
  );
}
