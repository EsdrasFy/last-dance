"use client";
import React from "react";

import Image from "next/image";
import logo from "../../assets/bird-logo.png";
import Link from "next/link";

import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiSearch,
} from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import SearchInput from "../ui/searchInput";

interface headerProps {
  href: string;
}

async function Header({ href }: headerProps) {
  return (
    <>
      <header className="flex justify-between items-center bg-custom-grayTwo py-4 px-7 beforeEffect afterEffect absolute top-0 left-0 w-full z-50">
        <figure className="flex w-fit gap-3 items-center">
          <Image
            src={logo}
            alt="logo image"
            width={35}
            height={35}
            className=""
          />
          <p className="max-w-[80px] leading-5 text-[15px] tracking-widest text-white max-md:text-base">
            URBAN VOGUE
          </p>
        </figure>
        <SearchInput classname="max-md:hidden w-[60%]"/>
        <ul className="flex gap-6 items-center justify-center mt-1">
          <li className=" text-3xl text-white duration-200 transition-all ease-linear hover:-translate-y-1.5 hover:text-custom-pink cursor-pointer max-md:text-[28px]">
            <button>
              <HiOutlineHeart />
            </button>
          </li>
          <li className=" text-3xl text-white duration-200 transition-all ease-linear hover:-translate-y-1.5 hover:text-custom-pink cursor-pointer max-md:text-[28px]">
            <button>
              <HiOutlineShoppingCart />
            </button>
          </li>
          <li className=" text-3xl text-white duration-200 transition-all  -translate-y-1 ease-linear hover:-translate-y-2.5 hover:text-custom-pink cursor-pointer max-md:text-[28px]">
            <Link href={href}>
              <AiOutlineUser />
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
