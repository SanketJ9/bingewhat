// src/components/Banner.tsx

'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import Slider from "./ui/Slider";
import { getMovieGenreNames } from "../lib/tmdbs";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  genre_ids: number[];
}

interface BannerProps {
  apiUrl: string;
}

// ✅ fetchTrendingMovies accepts string, not BannerProps
async function fetchTrendingMovies(apiUrl: string): Promise<Movie[]> {
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTZmZmQzYTYyMTU0OTZlNmZjOGEwNmJkZmJmMTU3ZiIsIm5iZiI6MTY0MDQ2MDI2My4wMDEsInN1YiI6IjYxYzc2ZmU2NmY1M2UxMDA0MmU5MDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPqtu0UuHv_j73lG-V0r4fkQhFr2zxebobqLZwkCg4w`, 
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch movies");

  const data = await res.json();
  const shuffled = [...data.results].sort(() => 0.8 - Math.random());
  return shuffled.slice(0, 8);
}

export default function Banner({ apiUrl }: BannerProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetchTrendingMovies(apiUrl) // ✅ Pass apiUrl properly
      .then((res) => {
        setMovies(res);
        setActiveMovie(res[0]);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [apiUrl]); 

  return (
    <>
      {activeMovie && (
        <div className="relative mx-auto h-[100svh] sm:h-[75vh] max-h-[1080px] w-full text-white overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${activeMovie.backdrop_path}`}
            alt={activeMovie.title || activeMovie.name || "Untitled"}
            fill
            className="object-cover"
            priority
          />

          <div className="relative flex flex-col justify-center h-full container max-w-7xl mx-auto px-4 z-10">
            <div className="md:left-12 max-w-[85%] sm:max-w-[40%]">
              <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
                {activeMovie.title || activeMovie.name}
              </h1>
              <p className="mt-2 mb-2 text-sm md:text-base text-white line-clamp-4 drop-shadow-sm">
                {activeMovie.overview}
              </p>
              {activeMovie.genre_ids && (
                <p className="text-sm md:text-md mb-6 mt-4 font-bold text-green-50">
                  {getMovieGenreNames(activeMovie.genre_ids).join(", ")}
                </p>
              )}
              <Link href={`/${activeMovie.id}`}>
                <Button>Watch Now ▶</Button>
              </Link>
            </div>

            <div className="banner-slider absolute right-0 bottom-0 z-40 w-[100%] sm:w-[50%]">
              <Slider movies={movies} onActiveChange={setActiveMovie} />
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full bg-[#051f2954] z-2" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051f29] via-transparent to-[#051f29]/20 z-2" />
        </div>
      )}
    </>
  );
}
