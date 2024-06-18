"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
import { Size } from "./MenuItemPriceProps";

interface MenuItem {
  name: string;
  _id: string;
  image: string;
  description: string;
  basePrice: number; // Update the type to number
  sizes: Size[];
  extraGradientPrices: Size[];
  category: string;
}
export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState<MenuItem[]>([]);
  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);
  return (
    <section>
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute -left-16 -top-[10px] text-left -z-10">
          <Image src={"/salad2.jpg"} width={409} height={189} alt={"salad"} />
        </div>
        <div className="absolute -top-[10px] -right-16 -z-10">
          <Image src={"/salad1.jpg"} width={409} height={195} alt={"salad"} />
        </div>
      </div>
      <div className="text-center py-20">
        <SectionHeaders subHeader="Check Out" mainHeader="Our Best Sellers" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
}
