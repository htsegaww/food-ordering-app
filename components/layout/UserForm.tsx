"use client";

import EditableImage from "@/components/layout/EditableImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import UseProfile from "../UseProfile";

interface User {
  name: string;
  image: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  email?: string;
  admin?: boolean;
}

export interface UserFormProps {
  onSave: (user: User) => void;
  user?: User;
}

export default function UserForm({ user, onSave }: UserFormProps) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUser } = UseProfile();

  return (
    <section className="mt-8">
      <div className="flex gap-4 mt-8 max-w-2xl mx-auto ">
        <div className="flex items-start flex-col h-44 w-44">
          <EditableImage link={image} setLink={setImage} />
        </div>

        <form
          className=" "
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              name: userName,
              image,
              phone,
              streetAddress,
              postalCode,
              city,
              country,
              email: user?.email,
              admin,
            });
          }}
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
          <Input type="email" disabled={true} value={user?.email || ""} />
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
                placeholder="Postal Code"
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
          <Label className="text-gray-500 text-sm leading-tight">Country</Label>
          <Input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          {/* Only show the admin checkbox if the logged in user is an admin */}

          {loggedInUser?.admin && (
            <div>
              <label
                className="p-2 inline-flex items-center gap-2 mb-2"
                htmlFor="adminCheckBox"
              >
                <input
                  id="adminCheckBox"
                  type="checkbox"
                  // change the color of the checkbox
                  className="accent-primary scale-115"
                  value={"1"}
                  checked={admin}
                  onChange={(ev) => setAdmin(ev.target.checked)}
                />
                <span>Admin</span>
              </label>
            </div>
          )}

          <Button type="submit" className="bg-primary text-white w-full">
            Save
          </Button>
        </form>
      </div>
    </section>
  );
}
