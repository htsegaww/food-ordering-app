"use client";

import Loading from "@/components/layout/Loading";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserData {
  name: string;
  image: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
}

interface User extends UserData {
  email: string;
  admin?: boolean;
}

export default function Profile() {
  const session = useSession();

  const [profileFetched, setProfileFetched] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { status } = session;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile")
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setIsAdmin(data.admin || false);
          setProfileFetched(true);
        });
    }
  }, [status]);

  const handleProfileInfoUpdate = async (data: UserData) => {
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        resolve(response.json());
      } else {
        reject(response.json());
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved successfully",
      error: "Failed to save",
    });
  };

  if (status === "loading" || !profileFetched) {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return (
      <section className="mt-8">
        <div className="flex flex-col">
          <h1 className=" font-semibold text-center mb-4">
            Please login to access your profile
          </h1>

          <Link href="/login" className="w-full">
            Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 ">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        {user && <UserForm user={user} onSave={handleProfileInfoUpdate} />}
      </div>
    </section>
  );
}
