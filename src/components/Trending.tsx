import React from "react";
import { useNavigate } from "react-router-dom";
import { Result } from "../models/responses_types";
import Card from "./Card";

const Trending = ({ data, title }: any) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    if (title === "movies") {
      navigate("/movies/" + id);
    } else {
      navigate("/series/" + id);
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <h2 className="mb-2 font-bold text-white ">{`${title}`} </h2>
        {/* <h2 className="mb-2 text-[#59585D] ">See all &#62;</h2> */}
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row md:justify-evenly">
        {data.map((mv: Result) => (
          <Card size="sm" key={mv.id} {...mv} handleClickCard={handleClick} />
        ))}
      </div>
    </>
  );
};

export default Trending;
