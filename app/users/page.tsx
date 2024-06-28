"use client";
import UseProfile from "@/components/useProfile";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";

import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  _id: string;
}

export default function Users() {
  const { loading, data } = UseProfile();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data?.admin) {
    return <div className="mt-8">You are not authorized to view this page</div>;
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />

      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user.email}
              className="bg-gray-100 rounded-lg mb-2 p-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!!user.name && (
                    <span className="font-semibold">{user.name}</span>
                  )}
                  {!user.name && <span className="italic">No Name</span>}
                </div>
                <span>{user.email}</span>
              </div>

              <div>
                <Link
                  href={"/users/" + user._id}
                  className="bg-primary text-white py-2 w-full px-8 rounded-md"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
