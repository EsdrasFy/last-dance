"use client";
import React from "react";
import image from "@/app/assets/model1.webp";
import Image from "next/image";
import { RiPencilRuler2Line } from "react-icons/ri";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
function page({ params }: any) {
  console.log(params);

  return (
    <section className="h-screen mt-28 mb-28 bg-custom-grayTwo max-w-[1050px] w-full mx-12 p-4 shadow-snipped text-custom-textColor">
      <div className="flex w-full h-[670px] gap-4">
        <div className="w-[45%] h-full flex gap-4">
          <div>
            <ul className="flex flex-col gap-4 min-h-full">
              <li className="w-14  cursor-pointer border-2 border-solid border-custom-pink">
                <Image alt="a" src={image} />
              </li>
              <li className="w-14 opacity-30  cursor-pointer border-2 border-solid border-custom-grayThree">
                <Image alt="a" src={image} />
              </li>
              <li className="w-14 opacity-30  cursor-pointer border-2 border-solid border-custom-grayThree">
                <Image alt="a" src={image} />
              </li>
              <li className="w-14 opacity-30  cursor-pointer border-2 border-solid border-custom-grayThree">
                <Image alt="a" src={image} />
              </li>
              <li className="w-14 opacity-30  cursor-pointer border-2 border-solid border-custom-grayThree">
                <Image alt="a" src={image} />
              </li>
              <li className="w-14 opacity-30  cursor-pointer border-2 border-solid border-custom-grayThree">
                <Image alt="a" src={image} />
              </li>
              <li className="w-14 opacity-30  cursor-pointer border-2 border-solid border-custom-grayThree">
                <Image alt="a" src={image} />
              </li>
            </ul>
          </div>
          <div className="min-h-full bg-white object-cover w-[100%]">
            <Image
              quality={100}
              alt="a"
              src={image}
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="w-[55%] h-full font-semibold">
          <div className="flex text-sm items-center text-custom-textColor">
            <span>SHOP</span>
            <span className="text-2xl">
              <MdKeyboardDoubleArrowRight className="" />
            </span>
            <span className="line-clamp-1 text-custom-pink underline uppercase">
              TOP EM VISCOSE MARESIA ESTAMPADO VISCOSE MARESIA ESTAMPADO VISCOSE
              MARESIA ESTAMPADO{" "}
            </span>
          </div>
          <div className="flex text-2xl font-bold mt-2">
            <p>Farm - Top em Viscose Maresia Estampado</p>
          </div>

          <div>
            <p className="font-light">
              Vendido e entregue por{" "}
              <span className="text-custom-pink">Posthaus.</span>
            </p>
          </div>
          <div className="flex gap-8 mt-4 items-center">
            <div>
              <p className="text-3xl text-custom-pink">$ 179,00</p>
            </div>
            <div> or </div>
            <div>
              <p className="text-base text-custom-textColor/60">6x of 35,80</p>
            </div>
          </div>
          <div>
            <p className="font-light">
              Garantia fornecida pela{" "}
              <span className="text-custom-pink">Posthaus.</span>
            </p>
          </div>
          <form className="flex-col mt-4">
            <label htmlFor="CEP" className="text-sm font-normal">
              calculate shipping:
            </label>
            <div className="w-full flex gap-2 items-center">
              <input
                type="text"
                id="CEP"
                className="w-[90%] bg-custom-grayThree/20 rounded-sm text-xl"
                placeholder="00000-000"
              />
              <button
                type="submit"
                className="w-[10%] bg-custom-grayThree/25 py-2.5 rounded-sm"
              >
                OK
              </button>
            </div>
          </form>
          <div>
            <button className="flex text-lg font-light gap-1 items-center mt-4">
            <span className="text-2xl">
            <RiPencilRuler2Line />
            </span> <span className="">Measurement Chart</span>
            </button>
          </div>
          <p>colors</p>
          <p>quantity</p>
          <button>BUY NOW</button>
          <button>ADD CART</button>
        </div>
      </div>
    </section>
  );
}

export default page;
