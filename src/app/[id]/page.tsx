// src/app/[id]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';

// Updated typing for params.id as string
export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { type: string } }) {
  const { id } = params;

  const mediaType = searchParams.type || 'movie';

  const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${Number(id)}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTZmZmQzYTYyMTU0OTZlNmZjOGEwNmJkZmJmMTU3ZiIsIm5iZiI6MTY0MDQ2MDI2My4wMDEsInN1YiI6IjYxYzc2ZmU2NmY1M2UxMDA0MmU5MDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPqtu0UuHv_j73lG-V0r4fkQhFr2zxebobqLZwkCg4w`, // Replace with actual API key
    }
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error('Failed to fetch media details');
  }

  const data = await res.json();

  return (
    <div className="relative mx-auto h-[100svh] sm:h-[75vh] w-full text-white overflow-y-auto ">
      <Image
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={data.title || data.name || "Untitled"}
        fill
        className="object-cover"
        priority
      />

      <div className="relative flex flex-col justify-end h-full container max-w-7xl mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="relative aspect-[2/3] w-[200px] rounded-lg overflow-hidden shadow-md cursor-pointer border-1 mg:border-2 border-[#0b3546]">
            <Image
              src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
              alt={data.title || data.name || 'Untitled'}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="max-w-[100%] sm:max-w-[480px]">
            <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg ">
              {data.title || data.name}
            </h1>
            {data.tagline && (
              <p className="mt-1 text-md md:text-base text-white line-clamp-4 drop-shadow-sm">
                {data.tagline}
              </p>
            )}
            <p className="mt-4 text-sm md:text-base text-white text-justify text-shadow-lg">
              {data.overview}
            </p>
            {data.genres && (
              <p className="text-lg md:text-xl mb-6 mt-4 font-bold text-green-50">
                {data.genres.map((genre: { name: string }) => genre.name).join(", ")}
              </p>
            )}
            <div className="inline-block text-xl bg-[#0b3546] text-[#3cd293] py-2 px-4 rounded-lg z-50 mb-2">
              {data.vote_average.toString().slice(0, 3)}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-[#051f2985] z-2" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#051f29] via-transparent to-[#051f29]/20 z-2" />
    </div>
  );
}
