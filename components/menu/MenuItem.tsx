import { Button } from "../ui/button";

export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
      <div className=" text-center">
        <img
          src="/hero.png"
          alt=""
          className="max-h-auto max-h-24 block mx-auto"
        />
      </div>
      <h4 className="font-semibold text-4xl my-2">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </p>
      <Button className="mt-4 px-12">Add to Cart $12</Button>
    </div>
  );
}
