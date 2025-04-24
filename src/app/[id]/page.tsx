import { notFound } from 'next/navigation';
import Image from 'next/image';


export default async function MediaDetails(props: {params: { id: string }; searchParams: { type?: string };}){
  const id = await props.params.id;
  const mediaType = await props.searchParams.type || 'movie';
    
  const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTZmZmQzYTYyMTU0OTZlNmZjOGEwNmJkZmJmMTU3ZiIsIm5iZiI6MTY0MDQ2MDI2My4wMDEsInN1YiI6IjYxYzc2ZmU2NmY1M2UxMDA0MmU5MDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPqtu0UuHv_j73lG-V0r4fkQhFr2zxebobqLZwkCg4w`,
    },
    next: { revalidate: 60 }, // optional: ISR
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error('Failed to fetch media details');
  }

  const data = await res.json();

  return (
    <>
        <div className="relative mx-auto h-[100svh] sm:h-[75vh] w-full text-white overflow-hidden">
            <Image
                src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                alt={data.title || data.name || "Untitled"}
                fill
                className="object-cover"
                priority
            />

            <div className="relative flex flex-col justify-end h-full container max-w-7xl mx-auto px-4 z-10">
                <div className="md:left-12 max-w-[85%] sm:max-w-[60%]">
                    <div className="relative aspect-[2/3] w-[200px] mb-8 rounded-lg overflow-hidden shadow-md cursor-pointer border-1 mg:border-2 border-[#0b3546] ">
                        <Image
                            src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
                            alt={data.title || data.name || 'Untitled'}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg ">
                        {data.title || data.name}
                    </h1>
                    <p className="mt-4 m text-sm md:text-base text-white drop-shadow-sm">
                        {data.overview}
                    </p>
                    {data.genres && (
                        <p className="text-lg md:text-xl mb-6 mt-4 font-bold text-green-50 ">
                            {data.genres.map((genre: { name: string }) => genre.name).join(", ")}
                        </p>
                    )}
                    <div className='inline-block text-xl bg-[#0b3546] text-[#3cd293] py-2 px-4 rounded-lg z-50 mb-2'>
                        {data.vote_average.toString().slice(0, 3)}
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#051f29] via-transparent to-[#051f29]/20" />

            

        </div>
    </>
    
  );
}
