import Image from "next/image";
import toast from "react-hot-toast";
import { Input } from "../ui/input";

interface EditableImageProps {
  link: string;
  setLink: (link: string) => void;
}
export default function EditableImage({ link, setLink }: EditableImageProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    // console.log(files);
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Image uploaded successfully",
        error: "Failed to upload image",
      });
    }
  };

  return (
    <>
      {link && (
        <Image
          src={link}
          alt="profile"
          width={0}
          height={0}
          className="rounded-lg w-full h-auto"
          priority
        />
      )}

      {!link && (
        <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}
      <label>
        <Input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border rounded-lg py-2 px-14 text-center cursor-pointer border-gray-300 mt-2 ">
          Change Image
        </span>
      </label>
    </>
  );
}
