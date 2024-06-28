"use client";

import { Size } from "@/components/layout/MenuItemPriceProps";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

interface Category {
  name: string;
  description: string;
  _id: string;
}

interface MenuItem {
  name: string;
  _id: string;
  image: string;
  description: string;
  basePrice: number;
  sizes: Size[];
  extraGradientPrices: Size[];
  category: string;
}
export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => setCategories(categories));
    });

    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => setMenuItems(menuItems));
    });
  }, []);

  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} subHeader="" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
