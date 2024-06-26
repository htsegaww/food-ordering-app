import Image from "next/image";

import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Size } from "../layout/MenuItemPriceProps";
import { Button } from "../ui/button";
import { CartContext } from "../AppContext";

export interface ExtraGradient {
  _id: string;
  name: string;
  price: number;
}

interface MenuItemProps {
  _id: string;
  image: string;
  name: string;
  description: string;
  basePrice: number;
  sizes: Size[];
  extraGradientPrices: ExtraGradient[];
}

const MenuItem: React.FC<MenuItemProps> = (menuItem) => {
  const { image, name, description, basePrice, sizes, extraGradientPrices } =
    menuItem;
  const [selectedSize, setSelectedSize] = useState<Size | null>(
    sizes?.[0] || null
  );
  const [selectedExtras, setSelectedExtras] = useState<ExtraGradient[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart }: any = useContext(CartContext);

  const handleAddToCart = () => {
    const hasOptions = sizes.length > 0 || extraGradientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopup(false);
    toast.success("Item added to cart");
  };

  const handleExtraGradientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    extra: ExtraGradient
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extra]);
    } else {
      setSelectedExtras((prev) => prev.filter((ex) => ex.name !== extra.name));
    }
  };

  let selectedPrice = basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras.length > 0) {
    selectedExtras.forEach((extra) => {
      selectedPrice += extra.price;
    });
  }

  return (
    <>
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-2 rounded-lg max-w-lg "
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image}
                alt={name}
                width="200"
                height="0"
                className="mx-auto w-full h-full object-cover rounded-md"
                priority
              />
              <h4 className="font-semibold text-4xl my-2 text-center">
                {name}
              </h4>
              <p className="text-gray-500 text-sm line-clamp-3 ">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="rounded-md p-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>

                  {sizes.map((size) => (
                    <Label
                      key={size.name}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <Input
                        type="radio"
                        name="size"
                        className="h-4 w-4"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                      />
                      {size.name} ${basePrice + size.price}
                    </Label>
                  ))}
                </div>
              )}

              {extraGradientPrices?.length > 0 && (
                <div className="rounded-md p-2">
                  <h3 className="text-center text-gray-700">Pick your extra</h3>

                  {extraGradientPrices.map((extra) => (
                    <Label
                      key={extra.name}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <Input
                        type="checkbox"
                        className="h-4 w-4"
                        name={extra.name}
                        onChange={(e) => handleExtraGradientChange(e, extra)}
                        checked={selectedExtras
                          .map((e) => e._id)
                          .includes(extra._id)}
                      />
                      {extra.name} + ${extra.price}
                    </Label>
                  ))}
                </div>
              )}

              <Button
                type="button"
                className="bg-primary text-white w-full sticky bottom-0"
                onClick={handleAddToCart}
              >
                Add to CART $ {selectedPrice}
              </Button>
              <Button
                type="button"
                className="bg-primary text-white w-full mt-2"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile
        onAddToCart={handleAddToCart}
        image={image}
        name={name}
        description={description}
        basePrice={basePrice}
        sizes={sizes}
        extraGradientPrices={extraGradientPrices}
      />
    </>
  );
};

export default MenuItem;
