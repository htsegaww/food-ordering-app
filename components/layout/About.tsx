import Image from "next/image";
import SectionHeaders from "./SectionHeaders";

export default function About() {
  return (
    <section className="text-center md:py-32 py-44 " id="about">
      <SectionHeaders subHeader="Our Story" mainHeader="About Us" />

      <div className="flex gap-10 items-start mt-10">
        <div className="hidden md:block">
          <Image
            src="/hero3.jpg"
            alt="Ethiopian Restaurant"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="text-gray-500 max-w-xl mx-auto flex flex-col gap-4 py-6 items-start">
          <p>
            Welcome to Ethiopian Restaurant, where the rich flavors and vibrant
            culture of Ethiopia come to life. Nestled in the heart of
            Indianapolis, our restaurant offers a unique dining experience that
            transports you straight to the highlands of Ethiopia.
          </p>
          <p>
            Our menu is a celebration of traditional Ethiopian cuisine,
            featuring authentic dishes prepared with the freshest ingredients
            and age-old recipes. From our flavorful injera and aromatic stews to
            our perfectly spiced meats and vegetarian options, each dish is a
            tribute to the culinary heritage of Ethiopia.
          </p>
          <p>
            At Ethiopian Restaurant, we believe in the power of food to bring
            people together. Our warm and inviting atmosphere is designed to
            make you feel at home, whether you&apos;re enjoying a meal with
            family, friends, or discovering Ethiopian cuisine for the first
            time. Our friendly staff is here to guide you through our menu and
            ensure that your dining experience is nothing short of
            extraordinary.
          </p>
        </div>
      </div>
    </section>
  );
}
