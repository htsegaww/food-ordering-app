"use client";

import UseProfile from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Category {
  name: string;
  _id: string | number;
}

export default function Categories() {
  const [categoryName, setCategoryName] = useState("");
  const { data: profileData, loading: profileLoading } = UseProfile();
  const [categories, setCategories] = useState<Category[]>([]);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories);
      });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastPromise = new Promise(async (resolve, reject) => {
      const data: Partial<Category> = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedCategory: Category = await response.json();

        setCategories((prevCategories) => {
          if (editedCategory) {
            return prevCategories.map((category) =>
              category._id === updatedCategory._id ? updatedCategory : category
            );
          } else {
            return [...prevCategories, updatedCategory];
          }
        });

        setCategoryName("");
        fetchCategories();
        setEditedCategory(null);
        resolve(response);
      } else {
        reject();
      }
    });

    await toast.promise(toastPromise, {
      loading: editedCategory
        ? "Updating Category "
        : "Creating category... 🚀",
      success: editedCategory
        ? "Category updated successfully ✔️"
        : "Category created successfully 🎉",
      error: "Failed to create category 😢",
    });
  };

  if (profileLoading) {
    return <Loading />;
  }

  if (!profileData || !profileData.admin) {
    toast.error("You are not authorized to view this page");
  }

  return (
    <div className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleSubmit}>
        <Label className="text-gray-500">
          {editedCategory ? "Update" : "Create"} Category
          {editedCategory && (
            <strong className="text-md">: {editedCategory.name}</strong>
          )}
        </Label>
        <div className="flex items-center justify-center gap-2">
          <Input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div>
            <Button type="submit" className="px-6">
              {editedCategory ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit Category</h2>
        <ul>
          {categories?.length > 0 &&
            categories.map((category) => (
              <div
                key={category._id}
                className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
              >
                <div className="grow">{category.name}</div>
                <div>
                  <Button
                    type="button"
                    className="flex cursor-pointer mb-1 w-full"
                    onClick={() => {
                      setEditedCategory(category);
                      setCategoryName(category.name);
                    }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}
