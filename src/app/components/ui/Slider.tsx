// src/components/ui/Slider.tsx

// 'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

interface Movie {
    id: number;
    title?: string;
    name?: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    genre_ids: number[];
}

interface SliderProps {
  movies: Movie[];
  onActiveChange?: (movie: Movie) => void; 
}

export default function Slider({ movies, onActiveChange }: SliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (onActiveChange && movies.length > 0) {
      onActiveChange(movies[activeIndex]);
    }
  }, [activeIndex, movies, onActiveChange]);

  return (
    <div className="common-swiper banner-swiper w-full px-4 py-6">
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={2.5}
        loop
        navigation
        
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {movies.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/${item.title ? 'movie' : 'tv'}/${item.id}`}>
            <div className="relative rounded-lg overflow-hidden shadow-md">
            <div className="swiper-image relative aspect-[2/3] sm:aspect-[2/3]  w-full rounded-lg overflow-hidden shadow-md">
                <Image
                    src={item.poster_path ?`https://image.tmdb.org/t/p/w780${item.poster_path}` : "/no-poster.jpg"}
                    alt={item.title || item.name || 'Untitled'}
                    fill
                    className="object-cover"
                    priority
                />
                </div>
              {/* <div className="absolute bottom-0 left-0 z-20 p-4 bg-primary text-white">
                <h2 className="text-sm sm:text-sm font-bold">{movie.title}</h2>
              </div> */}
            </div>
            </Link> 
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
