"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  basePrice: number;
  image: string;
  size?: {
    name: string;
    price: number;
  } | null;
  extras?: {
    name: string;
    price: number;
  }[];
}

interface CartProduct extends Product {
  size: { name: string; price: number } | null;
  extras: { name: string; price: number }[];
}

export interface CartContextType {
  cartProducts: CartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  addToCart: (
    product: Product,
    size?: { name: string; price: number } | null,
    extras?: { name: string; price: number }[]
  ) => void;
  removeCartProduct: (indexToRemove: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function cartProductPrice(cartProduct: CartProduct): number {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras && cartProduct.extras.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart") as string));
    }
  }, [ls]);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove: number) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success("Product removed");
  }

  function saveCartProductsToLocalStorage(cartProducts: CartProduct[]) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function addToCart(
    product: Product,
    size: { name: string; price: number } | null = null,
    extras: { name: string; price: number }[] = []
  ) {
    const cartProduct: CartProduct = {
      ...product,
      size,
      extras,
    };
    setCartProducts((prevProducts) => {
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
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
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
