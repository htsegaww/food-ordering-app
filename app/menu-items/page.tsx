"use client";
import UseProfile from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

interface MenuItem {
  name: string;
  _id: string;
  image: string;
}
export default function MenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { loading, data } = UseProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((items) => {
        setMenuItems(items);
      });
    });
  });

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
        <Link href="/menu-items/new" className="">
          <Button className="bg-primary text-white">
            Create new menu item <ArrowRightCircle className="ml-2" />
          </Button>
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit Menu Items</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                key={item.name}
                className="  font-semibold bg-gray-300 rounded-lg p-4"
              >
                <div className="relative ">
                  <Image
                    src={item.image}
                    alt=""
                    width="100"
                    height="100"
                    className="rounded"
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
