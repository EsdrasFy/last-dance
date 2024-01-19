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
import React, { useContext, useRef, useState } from "react";
import imgg from "@/app/assets/krgkuf4j.bmp";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";

function Cart() {
  const context = useContext(ContextApp);
  const [qtd, setQtd] = useState(1);
  const [arrow1, setArrow1] = useState(false);
  const [arrow2, setArrow2] = useState(false);

  if (!context) {
    // Tratar o caso onde o contexto não está definido, se necessário
    return null;
  }
  const { isOpen, onOpen, onClose } = context.disclosure;
  const { cartSummary } = context;

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const handleInputChange = (event: any) => {
    setQtd(event.target.value);
  };
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
          <DrawerCloseButton />
          <DrawerHeader>CART</DrawerHeader>
          <Divider />
          <DrawerBody>
            <ul>
              <li className="flex items-center justify-between gap-2">
                <Checkbox defaultChecked colorScheme='gray'
               >
                  <div className="max-w-[100px] min-w-[100px]">
                    <Image src={imgg} alt="aa" />
                  </div>
                </Checkbox>
                <div className="flex flex-col min-h-[100px] w-full justify-between gap-2 mr-4">
                  <div className="flex justify-between mr-8 flex-col">
                    <h3 className="line-clamp-1">
                      Hand Grip BPS 5-60KG Contador De Pulso Ajustável
                      ResistenteHand Grip BPS 5-60KG Contador De Pulso Ajustável
                      Resistente
                    </h3>
                    <div>
                      <p className="text-custom-pink text-xl">
                        $ 150,90{" "}
                        <span className="text-sm text-custom-grayThree">
                          {" "}
                          or in 4x of 50,00
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 ">
                    <Select
                      placeholder="Size"
                      iconColor="#ed145b"
                      icon={arrow1 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
                      onBlur={() => setArrow1(false)}
                      onClick={() => setArrow1(!arrow1)}
                      _focus={{
                        borderColor: "#ed145b", // Cor da borda ao focar
                        boxShadow: "0 0 0 1px #ed145b", // Sombra ao focar
                      }}
                      className="p-0 border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                    <Select
                      placeholder="Variation"
                      iconColor="#ed145b"
                      icon={arrow2 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
                      onBlur={() => setArrow2(false)}
                      onClick={() => setArrow2(!arrow2)}
                      _focus={{
                        borderColor: "#ed145b", // Cor da borda ao focar
                        boxShadow: "0 0 0 1px #ed145b", // Sombra ao focar
                      }}
                      className="p-0 border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
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
                          xmlns="http://www.w3.org/2000/svg"
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
                          xmlns="http://www.w3.org/2000/svg"
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
                    <button className="text-xl"><RiDeleteBinLine /></button>
                  </div>
                </div>
              </li>
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
