// src/components/ui/CommonSlider.tsx

'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { useLoading } from "../../context/loadingContext";


interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

interface CommonSliderProps {
  heading: string;
  apiUrl: string;
}

export default function CommonSlider({ heading,apiUrl}: CommonSliderProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    async function fetchData() {
      try {
        startLoading();
        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTZmZmQzYTYyMTU0OTZlNmZjOGEwNmJkZmJmMTU3ZiIsIm5iZiI6MTY0MDQ2MDI2My4wMDEsInN1YiI6IjYxYzc2ZmU2NmY1M2UxMDA0MmU5MDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPqtu0UuHv_j73lG-V0r4fkQhFr2zxebobqLZwkCg4w`, // replace with env var
          },
        });
        if (!res.ok) throw new Error('Failed to fetch data');

        const data = await res.json();
        setMediaItems(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        stopLoading();
      }
    }

    fetchData();
  }, [apiUrl]);

  return (
    <>
        <h3 className="text-2xl font-bold text-gray-50">{heading}</h3>
        <div className="common-swiper w-full py-2 ">
            <Swiper
                modules={[Navigation]}
                spaceBetween={6}
                slidesPerView={2.5}
                loop
                navigation
                breakpoints={{
                640: { 
                    spaceBetween: 10,
                    slidesPerView: 4.5 
                },
                1024: { 
                    spaceBetween: 12,
                    slidesPerView: 6.5 
                },
                }}
            >
                {mediaItems.map((item) => (
                <SwiperSlide key={item.id}>
                    <Link href={`/${item.title ? 'movie' : 'tv'}/${item.id}`}>
                    <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-md cursor-pointer border-1 mg:border-2 border-[#0b3546] hover:border-[#3cd293] transition-all duration-300 ease-in-out">
                        <Image
                            src={item.poster_path ?`https://image.tmdb.org/t/p/w780${item.poster_path}` : "/no-poster.jpg"}
                            alt={item.title || item.name || 'Untitled'}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className='absolute top-2 right-2 text-sm lg:text-md bg-[#0b3546] bg-opacity-20 text-[#3cd293] py-1 px-2 rounded-lg z-50'>
                            {item.vote_average.toString().slice(0, 3)}
                        </div>
                        <div className="absolute bottom-0 hidden left-0 z-20 w-full p-4 bg-gradient-to-t from-[#0b3546] to-transparent text-white">
                            <h3 className="text-sm font-bold">{item.title || item.name}</h3>
                        </div>
                    </div>
                    </Link>
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </>
  );
}
