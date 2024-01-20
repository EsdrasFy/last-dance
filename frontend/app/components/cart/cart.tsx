"use client";
import { ContextApp } from "@/app/contexts/ContextApp";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Divider,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import React, { useContext, useEffect, useRef, useState } from "react";
import imgg from "@/app/assets/krgkuf4j.bmp";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import Card from "@/app/interfaces/Card";
import ProductsById from "@/app/api/ProductsById";
import ItemCard from "./itemCard";

interface ApiResponse {
  data: ProductResponse | any[];
  status: number;
}

interface ProductResponse {
  products: Card[];
  notFoundIds: number[];
}
interface ProductCart {
  id: number;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}
interface CartSummary {
  totalPrice: number;
  totalQuantity: number;
  products: ProductCart;
}

function Cart() {
  
  const [arrow1, setArrow1] = useState(false);
  const [arrow2, setArrow2] = useState(false);
  const [dataProducts, setDataProducts] = useState<Card[]>([]);
  
  const context = useContext(ContextApp);
  if (!context) {
    // Tratar o caso onde o contexto não está definido, se necessário
    return null;
  }
  const { isOpen, onOpen, onClose } = context.disclosure;
  const { cartSummary } = context;

  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const query =
        cartSummary?.products.map((product) => product.id).join("&") ?? "";

      try {
        const res: ApiResponse | undefined = await ProductsById(query);
        if (res?.status === 200) {
          if ("products" in res.data) {
            setDataProducts(res.data.products);
          }
        } else {
          console.error("Resposta da requisição não contém dados esperados.");
        }
      } catch (error) {
        console.error("Erro na requisição do produto:", error);
      }
    };

    fetchData();
  }, [cartSummary?.products]);
  return (
    <>
      <Drawer
        size={"lg"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor={"#1d2123"} textColor={"#d9d9d9"}>
          {dataProducts ? <p>Tem data</p> : <p>Nao tem data</p>}
          <DrawerCloseButton />
          <DrawerHeader>CART</DrawerHeader>
          <Divider />
          <DrawerBody>
            <ul className="flex flex-col gap-2 ">
              {cartSummary?.products.map((product: any, index) => {
                const matchingProduct = dataProducts.find(
                  (dataProduct) => dataProduct.id === product.id
                ) as Card | null;

                return (
                  <ItemCard
                    key={index}
                    dataCart={product}
                    quantity={product.quantity}
                    id={product.id}
                    variation={product.size || "default"}
                    color={product.color || "default"}
                    dataId={matchingProduct}
                  />
                );
              })}
            </ul>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Cart;
