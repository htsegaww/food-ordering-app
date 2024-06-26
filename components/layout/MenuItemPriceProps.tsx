import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useState } from "react";

export interface Size {
  _id: string;
  name: string;
  price: number;
}

interface MenuItemPriceProps {
  props: Size[];
  setProps: React.Dispatch<React.SetStateAction<Size[]>>;
  name: string;
  addLabel: string;
}

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}: MenuItemPriceProps) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { _id: "", name: "", price: 0 }];
    });
  }

  function editProp(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    prop: string
  ) {
    const newValue = e.target.value;
    setProps((prevProps) => {
      const newProps = [...prevProps];
      newProps[index] = {
        ...newProps[index],
        [prop]: prop === "price" ? parseFloat(newValue) : newValue,
      };
      return newProps;
    });
  }

  function removeProp(indexToRemove: number) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2 flex flex-col mt-2">
      <Button
        className="inline-flex p-1 border-0 justify-start text-black"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}

        <span className="text-sm font-thin">{name}</span>
        <span className="ml-2">({props?.length})</span>
      </Button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex gap-2 items-center justify-center">
              <div>
                <Label className="text-sm font-thin">Name</Label>
                <Input
                  type="text"
                  placeholder="size"
                  value={size.name}
                  onChange={(e) => editProp(e, index, "name")}
                />
              </div>
              <div>
                <Label className="text-sm font-thin">Extra Price</Label>
                <Input
                  type="text"
                  placeholder="extra price"
                  value={size.price}
                  onChange={(e) => editProp(e, index, "price")}
                />
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => removeProp(index)}
                  className="text-primary bg-white p-2 "
                >
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
        <Button
          className="bg-white text-black flex items-center mt-2"
          type="button"
          onClick={addProp}
        >
          <Plus size={20} className="mr-2" />
          <span>{addLabel}</span>
        </Button>
      </div>
    </div>
  );
}
