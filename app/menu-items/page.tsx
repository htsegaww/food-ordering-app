"use client";
import UseProfile from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

import toast from "react-hot-toast";

export default function MenuItems() {
  const { loading, data } = UseProfile();

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
          <Button>
            Create new menu item <ArrowRightCircle className="ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
