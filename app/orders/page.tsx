"use client";
import Loading from "@/components/layout/Loading";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/useProfile";
import { DateTime } from "@/lib/dateTime";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const { data: profile, loading } = useProfile();
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile?.admin ?? null} />

      <div className="mt-8">
        {loadingOrders && (
          <div>
            <Loading />
          </div>
        )}
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={""}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex items-center gap-6"
            >
              <div className="grow flex gap-6 items-center">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-500") +
                      " p-2 rounded-md text-white w-24 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not paid"}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div>{order.userEmail}</div>
                    <div className="text-gray-500 text-sm">
                      {DateTime(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {order.cartProducts.map((p: any) => p.name).join(", ")}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 items-center whitespace-nowrap">
                <Link
                  href={"/orders/" + order._id}
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  Show Order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
