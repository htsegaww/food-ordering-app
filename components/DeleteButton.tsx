"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface DeleteButtonProps {
  label: string;
  onDelete: () => void;
}
export default function DeleteButton({ label, onDelete }: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/70 inset-0 flex items-center justify-center h-full">
        <div className="bg-white  py-8 px-16 rounded-lg">
          <p className="text-center mb-4">Are you sure you want to delete?</p>
          <div className="flex items-center justify-between">
            <Button
              className="bg-red-500 text-white px-4 rounded-md hover:bg-white hover:text-primary hover:border-primary border"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              Yes, Delete
            </Button>
            <Button
              className="bg-green-500 text-white px-4 rounded-md hover:bg-white hover:text-primary hover:border-primary border"
              onClick={() => setShowConfirm(false)}
            >
              No, Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setShowConfirm(true)}
        className=" bg-transparent text-primary text-center py-2 
         rounded-tr-lg rounded-bl-lg border border-primary hover:bg-primary hover:text-white transition
          duration-300 ease-in-out hover:shadow-lg ml-24 w-28 md:w-48"
      >
        {label}
      </button>
    </div>
  );
}
