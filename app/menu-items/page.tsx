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
    <section className="mt-8 max-w-4xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create new menu item</span>
          <ArrowRight />
        </Link>
      </div>
      <div>
        <h2 className="text-md text-gray-500 mt-8 mb-2 font-semibold">
          Edit menu item:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-3"
              >
                <div className="">
                  <Image
                    src={item.image}
                    alt={""}
                    width={350}
                    height={350}
                    priority
                    className="object-cover rounded-md w-full h-56"
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="font-semibold text-primary capitalize">
                    {item.name}
                  </div>
                  <div className="bg-primary text-white px-3 rounded-md font-semibold">
                    ${item.basePrice}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
