// src/components/ui/CommonSlider.tsx

'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';

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
  apiUrl: string;
}

export default function CommonSlider({ apiUrl }: CommonSliderProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
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
      }
    }

    fetchData();
  }, [apiUrl]);

  return (
    <div className="w-full px-4 py-6">
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={3.5}
        loop
        navigation
        breakpoints={{
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 6.5 },
        }}
      >
        {mediaItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-md cursor-pointer">
              <Image
                src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
                alt={item.title || item.name || 'Untitled'}
                fill
                className="object-cover"
                priority
              />
              <div className='absolute top-2 right-2 bg-[#0b3546] bg-opacity-20 text-[#3cd293] py-1 px-2 rounded-lg z-50'>
                {item.vote_average.toString().slice(0, 3)}
              </div>
                <div className="absolute bottom-0 visible sm:hidden left-0 z-20 w-full p-4 bg-gradient-to-t from-[#0b3546] to-transparent text-white">
                    <h3 className="text-sm font-bold">{item.title || item.name}</h3>
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
