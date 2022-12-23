import React from "react";
import IMDBICON from "../assets/icons/imdb.png";
import StarIcon from "@heroicons/react/24/solid/StarIcon";
import { Result } from "../models/responses_types";
import { API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from "../constant/const";

interface ICardProps extends Result {
  size: "md" | "sm";
}

const containerSize = {
  sm: "h-[20rem] w-[15rem]",
  md: "h-[20rem] w-[30rem]",
};
const cardTagPosition = {
  sm: "bottom-8",
  md: "bottom-0",
};

function Card({
  size,
  vote_average,
  poster_path,
  name,
  first_air_date,
  release_date,
  id,
}: ICardProps) {
  console.log(
    "🚀 ~ file: Card.tsx:76 ~ first_air_date",
    new Date(first_air_date).getFullYear(),
    id
  );

  const rating = () => {
    if (size === "md") {
      return <h2 className="text-white text-md "> {vote_average} rating </h2>;
    } else {
      return (
        <div className="absolute flex items-center justify-center gap-1 px-1 mx-2 text-white bg-black top-2 rounded-2xl ">
          <StarIcon
            className="text-yellow-500 text-md"
            height={15}
            width={15}
          />
          <h2 className="text-md">{vote_average}</h2>
        </div>
      );
    }
  };
  const watchButton = () => {
    const btStyle = {
      sm: "",
      md: "bottom-6 right-2",
    };
    return (
      <div
        className={`
          bg-[#811221] absolute bg-opacity-40  rounded-2xl align-middle	 w-[7rem] h-[2rem]
        text-center text-white 
          ${btStyle[size]}
          `}
      >
        Watch now
      </div>
    );
  };
  return (
    <div className={`${containerSize[size]} relative`}>
      {size === "sm" && rating()}
      <img
        alt="dsf"
        src={`${IMAGE_BASE_URL + IMAGE_SIZE + poster_path}`}
        className="w-full h-full bg-cover rounded-xl"
      />

      <div
        className={`absolute ${cardTagPosition[size]} flex justify-between w-full p-2 `}
      >
        <div>
          <h2 className="text-xl font-bold text-white ">{name}</h2>
          <h2 className="text-xl text-white ">
            {first_air_date
              ? new Date(first_air_date).getFullYear().toString()
              : new Date(release_date).getFullYear().toString()}
          </h2>
          {size === "md" ? (
            <div className="flex items-center gap-1">
              <img
                src={IMDBICON}
                className="w-[3rem] h-[3rem]"
                alt="movieimg"
              />
              {rating()}
            </div>
          ) : (
            watchButton()
          )}
        </div>
        {size === "md" && watchButton()}
      </div>
    </div>
  );
}

export default Card;
