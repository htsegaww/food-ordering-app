import Image from "next/image";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex items-center flex-col md:flex-row gap-8 justify-center mt-8 mb-24">
      <div className="flex flex-col gap-4 md:gap-8 p-3">
        <div className="flex items-center rounded-full bg-rose-100 gap-2 w-[400px] md:w-[400px] ">
          <Image src="/healthy.png" width="45" height="45" alt="" />
          <span className="text-sm ">
            Eat Healthy, Stay Healthy in Abyssinia restaurant
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            <h1 className="text-4xl  md:text-5xl font-semibold leading-snug md:leading-normal px-1">
              Everything is better with <br />
              <span className="text-primary font-extrabold">
                Ethiopian Food!!
              </span>
            </h1>
          </div>
          <div>
            <p className="my-6 px-2 text-gray-600 font-thin">
              Ethiopian cuisine is a rich and diverse culinary tradition that
              reflects the country&apos;s vibrant culture and history.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center md:justify-start justify-center">
          <Link
            href="/menu"
            className="flex gap-2 bg-primary text-white py-2 px-4 rounded-tr-lg rounded-bl-lg border hover:bg-transparent hover:text-primary transition duration-300 ease-in-out hover:shadow-lg"
          >
            Order Now <ArrowRight />
          </Link>
          <Link
            href="/#about"
            className="flex gap-2 font-semibold text-primary py-2 px-4 hover:bg-primary hover:text-white border border-primary rounded-tr-lg rounded-bl-lg transition duration-300 ease-in-out hover:shadow-lg "
          >
            Learn More <ArrowRight />
          </Link>
        </div>
      </div>
      <div className=" md:mt-24 ">
        <Image
          src="/hero3.jpg"
          alt="injera"
          width={600}
          height={600}
          style={{ width: "full", height: "auto", borderRadius: "1rem" }}
        />
      </div>
    </section>
  );
}
