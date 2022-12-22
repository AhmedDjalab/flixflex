import React from "react";
import IMDBICON from "../assets/icons/imdb.png";
import StarIcon from "@heroicons/react/24/solid/StarIcon";

interface ICardProps {
  size: "md" | "sm";
}

const containerSize = {
  sm: "h-[20rem] w-[15rem]",
  md: "h-[15rem] w-[30rem]",
};
const cardTagPosition = {
  sm: "bottom-8",
  md: "bottom-0",
};

function Card({ size }: ICardProps) {
  const rating = () => {
    if (size === "md") {
      return <h2 className="text-xl text-white "> 7.79 rating </h2>;
    } else {
      return (
        <div className="absolute flex items-center justify-center gap-1 px-1 mx-2 text-white bg-black top-2 rounded-2xl ">
          <StarIcon
            className="text-lg text-yellow-500"
            height={15}
            width={15}
          />
          <h2 className="text-md">7.79</h2>
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
        Watch Now
      </div>
    );
  };
  return (
    <div className={`${containerSize[size]} relative`}>
      {size === "sm" && rating()}
      <img
        alt="dsf"
        src="https://i.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4"
        className="w-full h-full bg-cover rounded-xl"
      />

      <div
        className={`absolute ${cardTagPosition[size]} flex justify-between w-full p-2 `}
      >
        <div>
          <h2 className="text-xl text-white ">The Army of dead </h2>
          <h2 className="text-xl text-white ">2022 </h2>
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
