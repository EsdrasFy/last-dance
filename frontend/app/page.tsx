"use client";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import React, { useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Swiper, SwiperSlide } from "swiper/react";
import NavbarHome from "./components/navbarHome/navbarHome";
import SearchInput from "./components/ui/searchInput";
import Model1 from "@/app/assets/model1.webp";
import Model2 from "@/app/assets/model2.webp";
import Model3 from "@/app/assets/model3.webp";
import Model4 from "@/app/assets/model4.webp";
import Image from "next/image";
export default function Home() {
  return (
    <main className="flex mx-10 min-h-screen max-w-[1050px] w-full px-10 flex-col items-center mt-24 max-md:mx-8">
      <aside className="flex w-full justify-center mt-4 md:hidden">
        <SearchInput classname="min-md:hidden w-full" />
      </aside>
      <NavbarHome />
      <section className="w-full flex h-96 gap-6 mt-12 max-md:hidden">
        {" "}
        <div className=" bg-custom-grayTwo text-custom-textColor w-1/4 flex items-center uppercase group duration-300 transition-all ease-linear overflow-x-hidden">
          <Image
            alt="Model2"
            src={Model2}
            className="w-full  h-full object-cover"
          />
          <span className="writing w-[17%] group-hover:w-0 tracking-widest duration-300 transition-all ease-linear group-hover:text-custom-textColor/0 flex items-center justify-center">
            Masculine
          </span>
        </div>{" "}
        <div className="w-1/2 h-full flex flex-col gap-6">
          <div className="h-1/2 bg-custom-grayTwo text-custom-textColor w-full flex flex-col items-center uppercase group duration-300 transition-all ease-linear overflow-hidden">
            <Image
              alt="Model3"
              src={Model3}
              className="w-full h-full object-cover"
            />
            <span className="text-[22px] h-[26%] group-hover:h-0 duration-300 transition-all ease-linear group-hover:text-custom-textColor/0 overflow-x-hidden tracking-[0.2em] flex items-center">
              Chieldren's
            </span>
          </div>{" "}
          <div className="h-1/2 bg-custom-grayTwo text-custom-textColor w-full flex flex-col items-center uppercase group duration-300 transition-all ease-linear overflow-hidden">
            <Image
              alt="Model4"
              src={Model4}
              className="w-full h-full object-cover"
            />
            <span className="text-[22px] h-[26%] group-hover:h-0 duration-300 transition-all ease-linear group-hover:text-custom-textColor/0 overflow-x-hidden tracking-[0.2em] flex items-center">
              Chieldren's
            </span>
          </div>{" "}
        </div>
        <div className=" bg-custom-grayTwo text-custom-textColor w-1/4 flex items-center uppercase group duration-300 transition-all ease-linear">
          <span className="writing w-[20%] group-hover:w-0 duration-300 transition-all ease-linear group-hover:text-custom-textColor/0 overflow-x-hidden tracking-[0.2em] flex items-center justify-center">
            Feminine
          </span>
          <Image
            alt="Model1"
            src={Model1}
            className="w-full  h-full object-cover"
          />
        </div>{" "}
      </section>

      <section className="relative w-full bg-custom-green">
        <h3>NEWS</h3>
        <Swiper
          slidesPerView={5}
          loop={true}
          spaceBetween={24}
          keyboard={true}
          mousewheel={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Pagination, Navigation,  Mousewheel, Keyboard ]}
          className="mySwiper bg-custom-pink overflow-x-hidden flex justify-center items-center overflow-hidden"
        >
          <SwiperSlide className="custom-slide">Slide 1</SwiperSlide>
          <SwiperSlide className="custom-slide">Slide 2</SwiperSlide>
          <SwiperSlide className="custom-slide">Slide 3</SwiperSlide>
          <SwiperSlide className="custom-slide">Slide 4</SwiperSlide>
          <SwiperSlide className="custom-slide">Slide 5</SwiperSlide>
          <SwiperSlide className="custom-slide">Slide 6</SwiperSlide>

          <SwiperSlide className="custom-slide">Slide 7</SwiperSlide>
          <SwiperSlide className="custom-slide">Slide 8</SwiperSlide>
          <SwiperSlide className="custom-slide">Slide 9</SwiperSlide>
          <SwiperSlide className="custom-slide">Slide 10</SwiperSlide>
          <div className="swiper-button-prev absolute top-1/2 cursor-pointer -translate-y-1/2 -left-[6%] hover:bg-custom-grayThree/40 duration-300 transition-all ease-linear rounded-md py-5 flex items-center justify-center">
            <SlArrowLeft className="text-5xl text-custom-pink" />
          </div>
          <div
            className="swiper-button-next absolute top-1/2 cursor-pointer -translate-y-1/2 -right-[6%] hover:bg-custom-grayThree/40 duration-300 transition-all ease-linear rounded-md py-5 flex items-center justify-center
                   "
          >
            <SlArrowRight className="text-5xl text-custom-pink" />
          </div>
        </Swiper>
      </section>
    </main>
  );
}
