import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditableImage from "@/components/layout/EditableImage";
import { Button } from "@/components/ui/button";
import MenuItemPriceProps, { Size } from "./MenuItemPriceProps";

interface MenuItem {
  name: string;
  _id: string;
  image: string;
  description: string;
  basePrice: string;
  sizes: Size[];
  extraGradientPrices: Size[];
  category: string;
}

interface MenuItemFormProps {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    data: MenuItemFormData
  ) => void;
  menuItem?: MenuItem | null;
}

interface MenuItemFormData {
  image: string;
  name: string;
  description: string;
  basePrice: string;
  sizes: Size[];
  extraGradientPrices: Size[];
  category: string;
}

interface Category {
  _id: string;
  name: string;
}
export default function MenuItemForm({
  onSubmit,
  menuItem,
}: MenuItemFormProps) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState<Size[]>(menuItem?.sizes || []);
  const [extraGradientPrices, setExtraGradientPrices] = useState<Size[]>(
    menuItem?.extraGradientPrices || []
  );

  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (menuItem) {
      setImage(menuItem.image);
      setName(menuItem.name);
      setDescription(menuItem.description);
      setBasePrice(menuItem.basePrice);
      setSizes(menuItem.sizes);
      setExtraGradientPrices(menuItem.extraGradientPrices);
      setCategory(menuItem.category);
    }
  }, [menuItem]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      className="mt-8 max-w-2xl mx-auto"
      onSubmit={(e) =>
        onSubmit(e, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraGradientPrices,
          category,
        })
      }
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="max-w-[200px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow ">
          <Label className="text-gray-500">Item name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-200 bg-gray-100"
          />
          <Label className="text-gray-500">Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-gray-200 bg-gray-100"
          />

          <Label>Category</Label>
          <select
            className=" w-full mb-2 rounded-xl border p-2 border-gray-200 bg-gray-100 text-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
          </select>

          <Label className="text-gray-500">Base Price</Label>
          <Input
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            className="border-gray-200 bg-gray-100"
          />

          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add Item Size"}
            props={sizes}
            setProps={setSizes}
          />

          <MenuItemPriceProps
            name={"Extra Gradients"}
            addLabel={"Add Ingredient Prices"}
            props={extraGradientPrices}
            setProps={setExtraGradientPrices}
          />

          <Button type="submit" className="w-full mt-4 bg-primary">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
