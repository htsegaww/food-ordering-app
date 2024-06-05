"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProgress, setLoginProgress] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginProgress(true);
    await signIn("credentials", { email, password, callbackUrl: "/" });
    setLoginProgress(false);
  };
  return (
    <section className="mt-8">
      <h1 className="text-4xl font-semibold text-center mb-4">Login</h1>

      <form
        className="flex flex-col gap-2 mt-6 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginProgress}
          className="disabled:opacity-50"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginProgress}
          className="disabled:opacity-50"
        />

        <Button
          type="submit"
          className="disabled:opacity-50"
          disabled={loginProgress}
        >
          Login
        </Button>

        <div className="my-4 text-center text-gray-500">
          or Login with Provider
        </div>
        <Button
          type="button"
          className="bg-transparent text-black border border-gray-500 flex gap-4 justify-center text-md "
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src="/google.png" alt="" width={24} height={22} />
          Login with Google
        </Button>
        <div className="border-t text-center py-3 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Register &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
