"use client";

import EditableImage from "@/components/layout/EditableImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import UseProfile from "../useProfile";
import AddressInputs from "./AddressInputs";

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

  function handleAddressChange(propName: string, value: string) {
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
    if (propName === "phone") setPhone(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "streetAddress") setStreetAddress(value);
  }
  return (
    <section className="mt-8">
      <div className="md:flex gap-4 max-w-2xl mx-auto ">
        <div className="flex items-start flex-col h-44 w-44">
          <EditableImage link={image} setLink={setImage} />
        </div>

        <form
          className="mt-16"
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
          <AddressInputs
            addressProps={{
              phone,
              streetAddress,
              postalCode,
              city,
              country,
            }}
            setAddressProp={handleAddressChange}
          />
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
