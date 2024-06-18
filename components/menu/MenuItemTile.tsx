import Image from "next/image";
import { Button } from "../ui/button";
import { Size } from "../layout/MenuItemPriceProps";
import { ExtraGradient } from "./MenuItem";
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
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
      <div className="text-center">
        <Image
          src={image}
          alt=""
          width="300"
          height="300"
          className="max-h-32 block mx-auto"
        />
      </div>
      <h4 className="font-semibold text-4xl my-2">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <Button
        className="mt-4 px-12 text-white bg-primary"
        onClick={onAddToCart}
      >
        {sizes?.length > 0 || extraGradientPrices?.length > 0 ? (
          <span>Add to cart From ${basePrice}</span>
        ) : (
          <span>add to cart ${basePrice}</span>
        )}
      </Button>
    </div>
  );
}
