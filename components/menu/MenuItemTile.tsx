import Image from "next/image";

import { Size } from "../layout/MenuItemPriceProps";
import { ExtraGradient } from "./MenuItem";
import { AddToCartBtn } from "./AddToCartBtn";
interface MenuItemTileProps {
  onAddToCart: () => void;
  image: string;
  name: string;
  description: string;
  basePrice: number;
  sizes: Size[];
  extraGradientPrices: ExtraGradient[];
}

export default function MenuItemTile({
  onAddToCart,
  image,
  name,
  description,
  basePrice,
  sizes,
  extraGradientPrices,
}: MenuItemTileProps) {
  const hasSizesExtras = sizes.length > 0 || extraGradientPrices.length > 0;
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
      <div className="text-center">
        <Image
          src={image}
          alt=""
          width="300"
          height="300"
          priority
          className="max-h-32 block mx-auto"
        />
      </div>
      <h4 className="font-semibold text-4xl my-2">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>

      <AddToCartBtn
        image={image}
        hasSizesExtras={hasSizesExtras}
        basePrice={basePrice}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
