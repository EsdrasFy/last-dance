"use client";
import NavbarHome from "@/app/components/navbarHome/navbarHome";
import SearchInput from "@/app/components/ui/searchInput";
import Image from "next/image";
import React from "react";
import Model1 from "@/app/assets/model1.webp";
import Model2 from "@/app/assets/model2.webp";
import Model3 from "@/app/assets/model3.webp";
import Model4 from "@/app/assets/model4.webp";
import { useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Suspense } from "react";
import CardSlide from "@/app/components/ui/carrosel/cardSlide";
import ProductQuery from "@/app/api/ProductQuery";
import Card from "@/app/interfaces/Card";


function Loading() {
  return <div>Carregando...</div>;
}

function Shop() {
  const [data, setData] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null); // Ajuste o tipo para 'unknown | null'
  const query = "search=quintess";
  const category = "teste";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result: any = await ProductQuery(query);
        setData(result.data);
        console.log(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <main className="flex mx-10 min-h-screen max-w-[1050px] w-full px-10 flex-col items-center mt-24 max-md:mx-8">
      <aside className="flex w-full justify-center mt-4 md:hidden">
        <SearchInput classname="min-md:hidden w-full" />
      </aside>
      <NavbarHome />
      <section className="w-full flex h-96 gap-6 mt-4 max-md:hidden font-extralight">
        {" "}
        <div className="shadow-snipped bg-custom-grayTwo text-custom-textColor w-1/4 flex items-center uppercase group duration-300 transition-all ease-linear overflow-x-hidden">
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
          <div className="shadow-snipped h-1/2 bg-custom-grayTwo text-custom-textColor w-full flex flex-col items-center uppercase group duration-300 transition-all ease-linear overflow-hidden">
            <Image
              alt="Model3"
              src={Model3}
              className="w-full h-full object-cover"
            />
            <span className="text-[22px] h-[26%] group-hover:h-0 duration-300 transition-all ease-linear group-hover:text-custom-textColor/0 overflow-x-hidden tracking-[0.2em] flex items-center">
              Chieldren's
            </span>
          </div>{" "}
          <div className="shadow-snipped h-1/2 bg-custom-grayTwo text-custom-textColor w-full flex flex-col items-center uppercase group duration-300 transition-all ease-linear overflow-hidden">
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
        <div className="shadow-snipped bg-custom-grayTwo text-custom-textColor w-1/4 flex items-center uppercase group duration-300 transition-all ease-linear">
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
      <section className={`relative w-full pt-10 pb-14`}>
        <h3 className="font-extralight text-2xl text-custom-textColor mb-4">
          {category}
        </h3>

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
          modules={[Pagination, Navigation, Mousewheel, Keyboard]}
          className="mySwiper overflow-x-hidden flex justify-center items-center overflow-hidden"
        >
          <Suspense fallback={<Loading/>}>
          {
            data.map((card: Card) => (

              <SwiperSlide
                key={card.id}
                className="shadow-snipped custom-slide flex flex-col bg-custom-grayTwo"
                >
                <CardSlide data={card} />
              </SwiperSlide>
            ))
            }
            </Suspense>

          <div className="swiper-button-prev absolute top-1/2 cursor-pointer -translate-y-1/2 -left-[6%] hover:bg-custom-grayThree/40 duration-300 transition-all ease-linear rounded-md py-5 flex items-center justify-center">
            <SlArrowLeft className="text-5xl text-custom-pink" />
          </div>
          <div className="swiper-button-next absolute top-1/2 cursor-pointer -translate-y-1/2 -right-[6%] hover:bg-custom-grayThree/40 duration-300 transition-all ease-linear rounded-md py-5 flex items-center justify-center">
            <SlArrowRight className="text-5xl text-custom-pink" />
          </div>
        </Swiper>
      </section>
    </main>
  );
}

export default Shop;
