"use client";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

interface Product {
  id: number;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}
interface CartSummary {
  totalPrice: number;
  totalQuantity: number;
  products: Product[];
}

interface AppContextProps {
  searchValue: string | null;
  setSearchValue: React.Dispatch<React.SetStateAction<string | null>>;
  totalQuant: number | null;
  setTotalQuant: React.Dispatch<React.SetStateAction<number | null>>;
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cartSummary: CartSummary | undefined;
  setCartSummary: React.Dispatch<React.SetStateAction<CartSummary | undefined>>;
  addItemToCart: (data: Product) => void;
  disclosure: UseDisclosureReturn;
  disclosureFav: UseDisclosureReturn;
}

const ContextApp = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [productsCart, setProductsCart] = useState<Product[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary>();
  const [totalQuant, setTotalQuant] = useState<number | null>(null);
  const disclosure = useDisclosure();
  const disclosureFav = useDisclosure();
  
  const calculateCartSummary = (cartItems: Product[]): CartSummary => {
    const { totalPrice, totalQuantity } = cartItems.reduce(
      (acc, item) => {
        return {
          totalPrice: item.price * item.quantity + acc.totalPrice,
          totalQuantity: item.quantity + acc.totalQuantity,
        };
      },
      { totalPrice: 0, totalQuantity: 0 }
    );
  
    return {
      totalPrice,
      totalQuantity,
      products: cartItems,
    };
  };
  
  useEffect(() => {
    const getArray = JSON.parse(localStorage.getItem("MyCart") || "null") as Product[];
    if (getArray) {
      setProductsCart(getArray);
      setCartSummary(calculateCartSummary(getArray));
    } else {
      localStorage.setItem("MyCart", JSON.stringify(productsCart));
    }
  }, [/* Dependências conforme necessário */]);
  
  const addItemToCart = (data: Product) => {
    const { id, quantity, size, color } = data;
  
    const existingProduct = productsCart.find(
      (product) =>
        product.id === id && product.size === size && product.color === color
    );
  
    let updatedCart: Product[];
  
    if (!existingProduct) {
      updatedCart = [...productsCart, { ...data, quantity }];
    } else {
      updatedCart = productsCart.map((product) =>
        product.id === id && product.size === size && product.color === color
          ? { ...product, quantity: product.quantity + quantity }
          : product
      );
    }
  
    setProductsCart(updatedCart);
    localStorage.setItem("MyCart", JSON.stringify(updatedCart));
    setCartSummary(calculateCartSummary(updatedCart));
  };
  const contextValue: AppContextProps = {
    searchValue,
    setSearchValue,
    cartSummary,
    setCartSummary,
    totalQuant,
    setTotalQuant,
    filteredProducts,
    setFilteredProducts,
    addItemToCart,
    disclosure,
    disclosureFav,
  };

  return (
    <ContextApp.Provider value={contextValue}>{children}</ContextApp.Provider>
  );
};

export { ContextApp, AppProvider };
