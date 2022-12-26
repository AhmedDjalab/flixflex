import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Logo from "../components/Logo";
import { IMAGE_BASE_URL, IMAGE_BIG_SIZE, IMAGE_SIZE } from "../constant/const";
import { Movie, VideoResult } from "../models/movie";
import { Result } from "../models/responses_types";
import { Serie } from "../models/serie";
import { getMovieDetails } from "../services/moviesServices";

function MovieDetails() {
  const { id } = useParams();
  const [trailer, setTrailer] = useState<VideoResult>();
  const [playing, setPlaying] = useState(false);
  const {
    isLoading,
    isError,
    data: movie,
  } = useQuery<Movie>(
    `movie:${id}`,
    () => getMovieDetails<Movie>({ id: id! }),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (movie && movie.videos && movie.videos.results) {
      const trailer = movie.videos.results.find(
        (vid) => vid.name === "Official Trailer" || vid.name === "Trailer"
      );
      setTrailer(trailer ? trailer : movie.videos.results[0]);
    }
  }, [movie, trailer]);

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <Logo />
        <h2 className="text-white">Error accured , please try again </h2>
      </div>
    );
  return isLoading ? (
    <div className="flex flex-col items-center justify-center flex-1">
      <Logo />
      <h2 className="text-white">Loading ... </h2>
    </div>
  ) : playing ? (
    <>
      (
      <button
        onClick={() => setPlaying(false)}
        className="flex justify-center text-xl text-center text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <ReactPlayer
        height="100vh"
        width="100vw"
        url={"https://www.youtube.com/watch?v=" + trailer?.key}
        controls={true}
      />
    </>
  ) : (
    <div className="flex gap-2 mx-8 mt-5">
      <img
        src={`${IMAGE_BASE_URL + IMAGE_SIZE + movie?.poster_path}`}
        alt={movie?.title}
        className="w-[20rem] h-[30rem] bg-cover rounded-md shadow-md "
      />

      <div className="flex flex-col gap-10 mx-8">
        <h2 className="text-3xl font-bold text-red-500">{movie?.title}</h2>
        <p className="text-lg text-white">{movie?.overview}</p>
        <div className="flex justify-around flex-1">
          {/* left side  */}
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-bold text-red-500 text-md">
                Original Release
              </h2>
              <p className="text-white text-md">
                {movie?.release_date
                  ? moment(movie.release_date).format("MMMM D, YYYY")
                  : "N/A"}
              </p>
            </div>
            <div>
              <h2 className="font-bold text-red-500 text-md">Running Time</h2>
              <p className="text-white text-md">
                {movie?.runtime === 0 || !movie?.runtime
                  ? "N/A"
                  : `${movie.runtime} mins`}
              </p>
            </div>
            <div>
              <h2 className="font-bold text-red-500 text-md">Budget</h2>
              <p className="text-white text-md">
                {movie?.budget === 0 || !movie?.budget
                  ? "N/A"
                  : `$${Number(movie.budget).toLocaleString()}`}
              </p>
            </div>
          </div>

          {/* right side */}
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-bold text-red-500 text-md">Revenue</h2>
              <p className="text-white text-md">
                {movie?.revenue === 0 || !movie?.revenue
                  ? "N/A"
                  : `$${Number(movie.revenue).toLocaleString()}`}
              </p>
            </div>
            <div>
              <h2 className="font-bold text-red-500 text-md">Voting Average</h2>
              <p className="text-white text-md">
                {(movie!.vote_average * 10).toFixed(2)}%
              </p>
            </div>
            <div>
              <h2 className="font-bold text-red-500 text-md">Genres</h2>
              <p className="flex gap-2 text-white text-md">
                {movie?.genres
                  ? movie?.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="p-2 text-center text-white bg-red-500 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`
          bg-[#811221]  bg-opacity-40  rounded-2xl align-middle	 w-[7rem] h-[2rem]
        text-center text-white font-bold cursor-pointer
         
          `}
          onClick={() => setPlaying(true)}
        >
          Trailer
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
