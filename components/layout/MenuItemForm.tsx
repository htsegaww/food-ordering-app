import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps, {
  Size,
} from "@/components/layout/MenuItemPriceProps";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraGradientPrices,
          category,
        })
      }
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow flex flex-col gap-2">
          <Label>Item name</Label>
          <Input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Description</label>
          <Input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
            className=" w-full mb-2 rounded-xl border p-2 border-gray-200 bg-gray-100 text-black"
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <Label>Base price</Label>
          <Input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients prices"}
            props={extraGradientPrices}
            setProps={setExtraGradientPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
