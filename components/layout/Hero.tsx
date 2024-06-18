import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRightCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero mt-24">
      <div className="py-12 ">
        <h1 className="text-4xl font-semibold">
          Everything <br />
          is better with <br />
          <span className="text-primary">Ethiopian Food!!</span>
        </h1>
        <p className="my-6 text-gray-500">
          Ethiopian cuisine is a rich and diverse culinary tradition that
          reflects the country&apos;s vibrant culture and history.
        </p>
        <div className="flex gap-4">
          <Button className="flex gap-2">
            Order Now <ArrowRightCircle />
          </Button>
          <Button className="flex gap-2 font-semibold text-gray-500 bg-transparent">
            Learn More <ArrowRightCircle />
          </Button>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/hero.png"
          alt="injera"
          width="300"
          height="300"
          objectFit="contain"
        />
      </div>
    </section>
  );
}