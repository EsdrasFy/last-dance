import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import logo from "@/app/assets/logo-big.png";
import CreateComment from "./createComment";
import CommentCard from "./commentCard";
import CommentsApi from "@/app/api/CommentsApi";
import RatingViewUi from "../ratingViewUi";

interface CommentsProps {
  title: string;
  img: string;
  id: number;
  percentage: number;
  rating: number;
  quantityRatings: number;
}

interface Url {
  url: string;
}

interface Comment {
  text_comment: string;
  user_id: number | undefined;
  user_img: string;
  product_id: number;
  comment_id: number;
  rating: string;
  username: string;
  timespost: Date;
  recommend: boolean;
  urls: Url[];
}

interface ApiResponse {
  comments: Comment[];
}

function Comments({
  title,
  img,
  id,
  percentage,
  quantityRatings,
  rating,
}: CommentsProps) {
  let countPercentage = (450 * (100 - percentage)) / 100;

  const [dataComments, setDataComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id !== 0) {
        const res = await CommentsApi(id);

        if (res) {
          setDataComments(res.comments);
          console.log(res.comments);
        } else {
          console.error("Resposta da requisição não contém dados esperados.");
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <section className="h-full mt-2 mx-2 bg-custom-grayTwo max-w-[1050px] w-full max-md:mx-5 p-4 shadow-snipped text-custom-textColor">
        <div className="w-full">
          <div className="flex justify-between">
            <div className="w-full flex mt-3 justify-between">
              <h3 className="text-xl font-semibold">Product Reviews</h3>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="flex text-custom-pink text-xl gap-2">
                <RatingViewUi rating={rating} />
              </div>
              <div className="flex items-center flex-col gap-1">
                <p className="text-7xl">{rating.toFixed(1)}</p>
                <p className="text-sm text-custom-grayThree flex items-center justify-center gap-2">
                  <span className="text-custom-pink">{quantityRatings}</span>{" "}
                  Reviews
                </p>
              </div>
            </div>
            <div className="flex items-center max-sm:hidden">
              <Image src={logo} alt="a" className="w-20" />
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
                    <stop offset="45%" stopColor="#8d8d8d" />
                    <stop offset="55%" stopColor="#8d8d8d" />
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
        </div>
        <CreateComment img={img} title={title} id={id} />
      </section>
      <section className=" mt-2 border-solid border-4 border-custom-grayTwo h-full bg-custom-grayOne max-w-[1050px] w-full mx-12 pb-4.5 max-md:mx-2 p-4 shadow-snipped text-custom-textColor flex flex-col gap-12 pt-4.5">
        {dataComments &&
          (dataComments.length === 0 ? (
            <div className="w-full flex items-center justify-center my-16 text-xl">
              <p>
                The product does not yet have ratings and comments. Log in and
                be the first.
              </p>
            </div>
          ) : (
            <ul className="w-full flex flex-col gap-5">
              {dataComments.map((comment) => (
                <CommentCard key={comment.comment_id} comment={comment} />
              ))}
            </ul>
          ))}
      </section>
    </>
  );
}

export default Comments;
