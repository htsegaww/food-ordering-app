"use client";
import { SessionProvider } from "next-auth/react";
import { useState, createContext, useEffect } from "react";

interface ExtraGradient {
  name: string;
  price: number;
}
export interface CartProduct {
  image: string;
  name: string;
  description: string;
  basePrice: number;
  extraGradientPrices: ExtraGradient[];
  sizes: string[];
  extras?: ExtraGradient[];
}

export interface CartContextProps {
  cartProducts: CartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  addToCart: (
    product: CartProduct,
    size?: string,
    extras?: ExtraGradient[]
  ) => void;
  clearCart: () => void;
  removeCartProduct: (index: number) => void;
}

export const CartContext = createContext<CartContextProps>({
  cartProducts: [],
  setCartProducts: () => {},
  addToCart: () => {},
  clearCart: () => {},
  removeCartProduct: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const storage = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (storage && storage.getItem("cart")) {
      const cart = storage.getItem("cart");
      if (cart) {
        setCartProducts(JSON.parse(cart));
      }
    }
  }, [storage]);

  function savingCartProducts(cartProducts: CartProduct[]) {
    if (storage) {
      storage.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function addToCart(
    product: CartProduct,
    size: string = "",
    extras: ExtraGradient[] = []
  ) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      savingCartProducts(newProducts);
      return newProducts;
    });
  }

  function clearCart() {
    setCartProducts([]);
    savingCartProducts([]);
  }

  function removeCartProduct(index: number) {
    setCartProducts((prevProducts) => {
      const newProducts = prevProducts.filter((_, i) => i !== index);
      savingCartProducts(newProducts);
      return newProducts;
    });
  }
  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          clearCart,
          removeCartProduct,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
