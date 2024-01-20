"use client";
import { Checkbox, Select } from "@chakra-ui/react";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import React, { useContext, useEffect, useRef, useState } from "react";
import imgg from "@/app/assets/krgkuf4j.bmp";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import Card from "@/app/interfaces/Card";
import { ContextApp } from "@/app/contexts/ContextApp";

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
  products: Product;
}

interface ItemCardProps {
  key: number;
  dataCart: CartSummary;
  dataId: Card | null;
  quantity: number;
  variation: string;
  id: number;
  color: string;
}

function ItemCard({
  dataCart,
  dataId,
  id,
  quantity,
  color,
  variation,
}: ItemCardProps) {
  console.log(quantity);
  const [arrow1, setArrow1] = useState(false);
  const [arrow2, setArrow2] = useState(false);
  const [qtd, setQtd] = useState(quantity);

  const context = useContext(ContextApp);
  if (!context) {
    // Tratar o caso onde o contexto não está definido, se necessário
    return null;
  }
  const { removeItemFromCart} = context;
 
  const handleInputChange = (event: any) => {
    setQtd(event.target.value);
  };

  const price = parseFloat(dataId?.price || "0.00");

  const installment = price / 6;


  return (
    <li className="my-4 flex items-center justify-between gap-2">
      <Checkbox defaultChecked colorScheme="gray">
        <div className="max-w-[100px] min-w-[100px] shadow-snipped object-contain">
          <Image
            src={dataId?.images[0].url || ""}
            alt={dataId?.images[0].url || ""}
            width={100}
            height={100}
            className="max-h-[100px]"
          />
        </div>
      </Checkbox>
      <div className="flex flex-col min-h-[100px] w-full justify-between gap-2 mr-4">
        <div className="flex justify-between mr-8 flex-col">
          <h3 className="line-clamp-1">{dataId?.title}</h3>
          <div>
            <p className="text-custom-pink text-xl">
              $ {price}{" "}
              <span className="text-sm text-custom-grayThree">
                {" "}
                or in 6x of {installment.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-2 ">
          {dataId && dataId.sizes.length !== 0&& (
            <Select
              iconColor="#ed145b"
              icon={arrow1 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
              onBlur={() => setArrow1(false)}
              value={variation}
              onClick={() => setArrow1(!arrow1)}
              _focus={{
                borderColor: "#ed145b",
                boxShadow: "0 0 0 1px #ed145b",
              }}
              className="p-0 shadow-snipped border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
            >
              {dataId?.sizes.map((size) => (
                <option value={size.size}>{size.size}</option>
              ))}
            </Select>
          )}

          {dataId && dataId.colors.length !== 0 && (
            <Select
              iconColor="#ed145b"
              icon={arrow2 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
              onBlur={() => setArrow2(false)}
              onClick={() => setArrow2(!arrow2)}
              value={color}
              _focus={{
                borderColor: "#ed145b",
                boxShadow: "0 0 0 1px #ed145b",
              }}
              className="p-0 shadow-snipped border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
            >
              {dataId.colors.map((color) => (
                <option key={color.name_color} value={color.name_color}>
                  {color.name_color}
                </option>
              ))}
            </Select>
          )}
        </div>
      </div>
      <div className="flex flex-col h-[100px] justify-between items-end">
        <div className="flex gap-3 items-center">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => setQtd(qtd > 1 ? qtd - 1 : qtd)}
              id="decrement-button"
              data-input-counter-decrement="counter-input"
              className="flex-shrink-0 shadow-snipped bg-custom-grayTwo hover:bg-custom-grayOne duration-300 ease-linear inline-flex items-center justify-center border border-custom-pink h-7 w-7 focus:ring-custom-pink dark:focus:ring-gray-700 focus:ring-1 focus:outline-none rounded-full"
            >
              <svg
                className="w-3.5 h-3.5 text-custom-pink dark:text-white"
                aria-hidden="true"
                xmlns="http:
                //www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="number"
              id="counter-input"
              data-input-counter
              onChange={handleInputChange}
              className="flex-shrink-0 -mx-1 text-custom-pink font-extrabold dark:text-white border-0 bg-transparent text-lg focus:outline-none focus:ring-0 max-w-[3.5rem] text-center"
              placeholder=""
              value={qtd}
              required
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              className="flex-shrink-0 bg-custom-grayTwo shadow-snipped hover:bg-custom-grayOne duration-300 ease-linear inline-flex items-center justify-center border border-custom-pink h-7 w-7 focus:ring-custom-pink dark:focus:ring-gray-700 focus:ring-1 focus:outline-none rounded-full"
              onClick={() => setQtd(qtd + 1)}
            >
              <svg
                className="w-3.5 h-3.5 text-custom-pink dark:text-white"
                aria-hidden="true"
                xmlns="http:
                //www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <button className="text-2xl hover:text-custom-pink duration-200 ease-linear hover:scale-110" onClick={() => removeItemFromCart(id)}>
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
    </li>
  );
}

export default ItemCard;
