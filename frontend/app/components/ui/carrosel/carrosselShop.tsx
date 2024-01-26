"use client"
import React, { useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel,  } from "swiper/modules";
import Loading from "./loading";
import CardSlide from "@/app/components/ui/carrosel/cardSlide";
import ProductQuery from "@/app/api/ProductQuery";
import Card from "@/app/interfaces/Card";

interface CarrosselShopProps {
  query: string;
  category: string;
  classname?:string
}

function CarrosselShop({ query, category, classname }: CarrosselShopProps) {
  const [data, setData] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result: any = await ProductQuery(query);
        setData(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <section className={`relative w-full ${classname} `}>
      <h3 className="font-extralight text-2xl text-custom-textColor mb-4">
        {category}
      </h3>
      {loading ? (
        <Swiper
          slidesPerView={5}
          loop={true}
          spaceBetween={24}
          mousewheel={true}
          modules={[Pagination, Navigation, Mousewheel, ]}
          className="mySwiper overflow-x-hidden flex justify-center items-center overflow-hidden"
        >
          {[...Array(10)].map((_, index) => (
            <SwiperSlide
              key={index}
              className="shadow-snipped custom-slide flex flex-col bg-custom-grayTwo"
            >
              <Loading />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          slidesPerView={5}
          loop={true}
          spaceBetween={24}
          mousewheel={true}
          modules={[Pagination, Navigation, Mousewheel, ]}
          className="mySwiper overflow-x-hidden flex justify-center items-center overflow-hidden"
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          {data.map((card: Card) => (
            <SwiperSlide
              key={card.id}
              className="shadow-snipped custom-slide flex flex-col bg-custom-grayTwo"
            >
              <CardSlide data={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}

export default CarrosselShop;