"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { Button } from "@/components/ui/button";
import useProfile from "@/components/useProfile";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";

export default function CartPage() {
  const cartContext = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  // console.log(profileData);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, postalCode, city, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        postalCode,
        city,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);
  if (!cartContext) {
    // Handle the case where the context is not available
    return <div>Error: Cart context is not available.</div>;
  }

  const { cartProducts, removeCartProduct } = cartContext;

  function handleAddressChange(propName: string, value: string) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" subHeader="" />
      </div>

      <div className="grid gap-8 grid-cols-2 mt-8">
        <div>
          {cartProducts.length === 0 && <div>No Products in shopping cart</div>}

          {cartProducts.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex gap-4 mb-2 border-b py-4  items-center"
              >
                <div className="w-32">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={240}
                    className="rounded-lg object-cover h-32 w-32"
                  />
                </div>

                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>

                  {product.size && (
                    <div className="text-sm text-gray-700">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}

                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map((extra) => (
                        <div key={extra.name}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <Button
                    className="text-black"
                    type="button"
                    onClick={() => removeCartProduct(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}

          <div className="py-2 text-right pr-16">
            <span className="text-gray-500">subtotal:</span>
            <span className="font-semibold text-lg pl-2">
              $
              {cartProducts.reduce(
                (acc, product) => acc + cartProductPrice(product),
                0
              )}
            </span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <Button className="bg-primary text-white w-full mt-4">
              Pay $
              {cartProducts.reduce(
                (acc, product) => acc + cartProductPrice(product),
                0
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
