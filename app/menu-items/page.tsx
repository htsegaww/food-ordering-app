"use client";

import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/useProfile";
import { ArrowRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MenuItem {
  _id: string;
  name: string;
  image: string;
  basePrice: number | string;
}
export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data?.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create new menu item</span>
          <ArrowRight />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image}
                    alt={""}
                    width={200}
                    height={200}
                    priority
                  />
                </div>
                <div className="text-center">{item.name}</div>
                <div className="text-center">{item.basePrice}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
