"use client";
import UseProfile from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import { useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItem() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = UseProfile();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, data: any) {
    e.preventDefault();

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
        <Link href="/menu-items">
          <Button className="bg-primary text-white">
            <ArrowLeft className="mr-2" /> Show all menu items
          </Button>
        </Link>
      </div>

      <MenuItemForm onSubmit={handleSubmit} menuItem={null} />
    </section>
  );
}
