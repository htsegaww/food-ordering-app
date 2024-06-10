"use client";

import EditableImage from "@/components/layout/EditableImage";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [profileFetched, setProfileFetched] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data?.user?.name || "");
      setImage(session.data?.user?.image || "");
      fetch("/api/profile")
        .then((response) => response.json())
        .then((data) => {
          setPhone(data.phone || "");
          setStreetAddress(data.streetAddress || "");
          setPostalCode(data.postalCode || "");
          setCity(data.city || "");
          setCountry(data.country || "");
          setIsAdmin(data.admin || false);
          setProfileFetched(true);
        });
    }
  }, [session, status]);

  const handleProfileInfoUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          image,
          phone,
          streetAddress,
          postalCode,
          city,
          country,
        }),
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
    <section className="mt-8">
      <h1 className="text-4xl font-semibold text-center mb-8">Profile</h1>

      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          <form
            className="grow flex flex-col gap-2"
            onSubmit={handleProfileInfoUpdate}
          >
            <Label className="text-gray-500 text-sm leading-tight">
              First and Last name
            </Label>
            <Input
              type="text"
              placeholder="First and Last Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Label className="text-gray-500 text-sm leading-tight">Email</Label>

            <Input
              type="email"
              disabled={true}
              value={session.data?.user?.email!}
            />
            <Label className="text-gray-500 text-sm leading-tight">
              Phone Number
            </Label>

            <Input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Label className="text-gray-500 text-sm leading-tight">
              Street Address
            </Label>
            <Input
              type="text"
              placeholder="Street address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <div className="flex gap-2">
              <div className="">
                <Label className="text-gray-500 text-sm leading-tight">
                  Postal Code
                </Label>
                <Input
                  type="text"
                  placeholder="Postal Code "
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-gray-500 text-sm leading-tight">
                  City
                </Label>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <Label className="text-gray-500 text-sm leading-tight">
              Country
            </Label>
            <Input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Button type="submit">Save</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
