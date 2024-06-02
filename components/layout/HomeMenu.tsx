import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
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
        <SectionHeaders subHeader="Check Out" mainHeader="Menu" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}
