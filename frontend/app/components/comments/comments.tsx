import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import logo from "@/app/assets/logo-big.png";
import CreateComment from "./createComment";

function Comments() {
  let percentage = 100;
  let countPercentage = 450 - (450 * percentage) / 100;

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="">
          <h3 className="text-xl font-semibold">Product Reviews</h3>
        </div>
        <button className="font-semibold cursor-pointer">See all</button>
      </div>
      <div className="w-full flex mt-6 justify-between">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex text-custom-pink text-xl gap-2">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <div className="flex items-center flex-col gap-1">
            <p className="text-7xl">4.6</p>
            <p className="text-sm text-custom-grayThree flex items-center justify-center gap-2">
              <span className="text-custom-pink">323</span> Reviews
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between my-4">
          <span className="bg-custom-pink/20 w-36 py-1 text-center rounded-md duration-300 ease-linear shadow-snipped hover:bg-custom-pink">
            Sei la
          </span>
          <span className="bg-custom-pink/20 w-36 py-1 text-center rounded-md duration-300 ease-linear shadow-snipped hover:bg-custom-pink">
            Sei la
          </span>
          <span className="bg-custom-pink/20 w-36 py-1 text-center rounded-md duration-300 ease-linear shadow-snipped hover:bg-custom-pink">
            Sei la
          </span>
        </div>
        <div className="flex items-center">
          <Image src={logo} alt="a" className="w-20" />
        </div>
        <div className="flex flex-col justify-between my-4">
          <span className="bg-custom-pink/20 w-36 py-1 text-center rounded-md duration-300 ease-linear shadow-snipped hover:bg-custom-pink">
            Sei la
          </span>
          <span className="bg-custom-pink/20 w-36 py-1 text-center rounded-md duration-300 ease-linear shadow-snipped hover:bg-custom-pink">
            Sei la
          </span>
          <span className="bg-custom-pink/20 w-36 py-1 text-center rounded-md duration-300 ease-linear shadow-snipped hover:bg-custom-pink">
            Sei la
          </span>
        </div>
        <div className="skill relative">
          <div className="outer shadow-snipped">
            <div className="inner shadow-snipped">
              <div
                id="number"
                className="flex flex-col items-center justify-center"
              >
                <span className="text-3xl text-custom-textColor">
                  {percentage}%
                </span>{" "}
                <span className="text-sm">recomended</span>
              </div>
            </div>
          </div>
          <svg
            xmlns="[1](http://www.w3.org/2000/svg)"
            version="1.1"
            width="160px"
            height="160px"
            className="progressbar"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stopColor="#ed145b" />
                <stop offset="45%" stopColor ="#8d8d8d" />
                <stop offset="55%" stopColor ="#8d8d8d" />
                <stop offset="100%" stopColor="#ed145b" />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="80"
              r="70"
              strokeLinecap="round"
              strokeDashoffset={countPercentage}
            />
          </svg>
        </div>
      </div>
      <CreateComment />
    </>
  );
}

export default Comments;
