"use client";
import UseProfile from "@/components/useProfile";
import Loading from "@/components/layout/Loading";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItem() {
  const { id } = useParams();

  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = UseProfile();

  useEffect(() => {
    // console.log(id);
    fetch("/api/menu-items").then((response) => {
      response.json().then((items) => {
        const item = items.find(
          (item: { _id: string | string[] }) => item._id === id
        );
        setMenuItem(item);
      });
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, data: any) {
    e.preventDefault();
    data = { ...data, _id: id };
    const menuItemSavingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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

  async function DeleteMenuItem() {
    const deletePromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve(response);
      } else {
        reject();
      }
    });
    await toast.promise(deletePromise, {
      loading: "Deleting... ",
      success: "Menu item deleted successfully ",
      error: "Failed to delete menu item",
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

      <MenuItemForm onSubmit={handleSubmit} menuItem={menuItem} />
      <div className=" max-w-md mx-auto mt-4">
        <div className=" max-w-xs ml-auto pl-4">
          <DeleteButton
            label="Delete This Menu Item"
            onDelete={DeleteMenuItem}
          />
        </div>
      </div>
    </section>
  );
}
