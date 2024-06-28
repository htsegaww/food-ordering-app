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
import { redirect } from "next/navigation";

interface AuthLinksProps {
  status: string;
  username: string | null | undefined;
}

function AuthLinks({ status, username }: AuthLinksProps) {
  if (status === "authenticated") {
    return (
      <>
        <Link
          href="/profile"
          className="text-primary underline underline-offset-4"
        >
          Hello, {username}
        </Link>
        <Button
          onClick={() => {
            signOut();
            redirect("/");
          }}
          className="bg-primary text-white"
        >
          Logout
        </Button>
      </>
    );
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Link
          href="/login"
          className=" font-semibold text-primary py-2 px-4 hover:bg-primary hover:text-white border border-primary rounded-tr-lg rounded-bl-lg transition duration-300 ease-in-out hover:shadow-lg "
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-primary text-white py-2 px-4 rounded-tr-lg rounded-bl-lg border hover:bg-transparent hover:text-primary transition duration-300 ease-in-out hover:shadow-lg"
        >
          Signup
        </Link>
      </>
    );
  }
}
export default function Header() {
  const session = useSession();
  console.log(session);
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
      <div className="flex md:hidden justify-between items-center ">
        <div>
          <Link href="/" className="text-primary font-semibold text-2xl">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/cart"
            className=" relative flex items-center gap-2 text-primary"
          >
            <CgShoppingCart size={25} />

            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full p-1 leading-3 ">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <Button
            className=" bg-primary text-white py-2 px-4 rounded-tr-lg rounded-bl-lg border hover:bg-transparent hover:text-primary transition duration-300 ease-in-out"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <MenuIcon size={25} />
          </Button>
        </div>
      </div>

      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-rose-50 rounded-lg mt-2 flex flex-col gap-2 text-center"
        >
          <Link
            href="/"
            className="hover:text-primary hover:underline underline-offset-4 transition-all ease-in-out duration-300"
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="hover:text-primary hover:underline underline-offset-4 transition-all ease-in-out duration-300"
          >
            Menu
          </Link>
          <Link
            href="/#about"
            className="hover:text-primary hover:underline underline-offset-4 transition-all ease-in-out duration-300"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="hover:text-primary hover:underline underline-offset-4 transition-all ease-in-out duration-300"
          >
            Contact
          </Link>
          <AuthLinks status={status} username={userName} />
        </div>
      )}

      <div className="hidden md:flex items-center justify-between w-full">
        <nav className="flex items-center gap-8 text-gray-600 font-thin">
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </Link>
        </nav>
        <nav className="flex items-center justify-center gap-10 ">
          <Link
            href="/"
            className="hover:text-primary hover:underline underline-offset-4 transition-all ease-in-out duration-300"
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="hover:text-primary hover:underline underline-offset-4 transition-all ease-in-out duration-300"
          >
            Menu
          </Link>
          <Link
            href="/#about"
            className="hover:text-primary hover:underline underline-offset-4 transition-all ease-in-out duration-300"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="hover:text-primary hover:underline underline-offset-4 transition-all ease-in-out duration-300"
          >
            Contact
          </Link>
        </nav>

        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} username={userName} />
          <Link
            href="/cart"
            className=" relative flex items-center gap-2 text-primary"
          >
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
