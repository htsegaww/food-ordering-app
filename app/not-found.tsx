import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-start justify-center mx-auto mt-16 gap-5">
      <div>
        <Image
          src="/404.jpg"
          alt=""
          width={600}
          height="100"
          className="rounded-xl"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl">Not Found</h2>
        <Link href="/" className="bg-primary text-white px-4 py-2 rounded-lg ">
          Return Home
        </Link>
      </div>
    </div>
  );
}
