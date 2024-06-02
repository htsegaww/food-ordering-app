"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const user = await response.json();
      router.push("/login");
      if (response.ok) {
        setUserCreated(true);
        setEmail("");
        setPassword("");
        toast.success("User created successfully");
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);

      toast.error("An error occurred. Please try again");
    }

    setCreatingUser(false);
  };
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl font-semibold">
        Register
      </h1>

      <form
        className="flex flex-col gap-2 mt-6 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
          className="disabled:opacity-50"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser}
          className="disabled:opacity-50"
        />
        <Button
          type="submit"
          disabled={creatingUser}
          className="disabled:opacity-50"
        >
          Register
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
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
