import { cartProductPrice } from "@/components/AppContext";

import Image from "next/image";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function CartProduct({ product, onRemove, index }: any) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 border-b py-4">
      <div className="w-36 ">
        <Image width={240} height={240} src={product.image} alt={""} />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra: any) => (
              <div key={extra.name}>
                {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>

      <div className="ml-2">
        <Button
          type="button"
          onClick={() => onRemove(index)}
          className="p-2 text-black"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
