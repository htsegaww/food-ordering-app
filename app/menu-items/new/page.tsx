"use client";
import UseProfile from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import { useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditableImage from "@/components/layout/EditableImage";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

export default function NewMenuItem() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = UseProfile();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { image, name, description, basePrice };
    const menuItemSavingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        resolve(response);
      } else {
        reject("Failed to save menu item");
      }
    });

    await toast.promise(menuItemSavingPromise, {
      loading: "Saving... ",
      success: "Menu item saved successfully ",
      error: "Failed to save menu item",
    });

    setRedirectToItems(true);
  }
  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return <Loading />;
  }

  if (!data?.admin) {
    toast.error("You are not authorized to view this page");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div>
        <Link href="/menu-items" className="">
          <Button>
            <ArrowLeft className="mr-2" /> Show all menu items
          </Button>
        </Link>
      </div>

      <form className="mt-8 max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center justify-center">
          <div className="max-w-[200px]">
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow ">
            <Label className="text-gray-500"> Item name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label className="text-gray-500"> Description</Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Label className="text-gray-500">Base Price</Label>
            <Input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />

            <Button type="submit" className="w-full mt-4">
              Save
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
