"use client";

import UseProfile from "@/components/useProfile";
import Loading from "@/components/layout/Loading";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface UserData {
  name: string;
  email: string;
  _id: string;
  image: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  admin?: boolean;
}

export default function EditUserPage() {
  const { loading, data } = UseProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((response) => {
      response.json().then((user) => {
        setUser(user);
      });
    });
  }, [id]);

  async function handleSave(data: any) {
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, _id: id }),
      });

      if (response.ok) {
        resolve(response.json());
      } else {
        reject(response.json());
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "User Saved!",
      error: "An error occurred while saving the user.",
    });
  }

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
        {user && <UserForm user={user} onSave={handleSave} />}
      </div>
    </section>
  );
}
