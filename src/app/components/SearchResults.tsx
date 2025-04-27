'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getMovieGenreNames } from "../lib/tmdbs";
import { FaStar } from "react-icons/fa6";
import { useSearch } from "../context/searchContext";



interface SearchResultsProps {
    searchParams: string;
}

interface Movie {
    id: number;
    title?: string;
    name?: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    genre_ids: number[];
    vote_average: number;
  }

export default function SearchResults() {
    
    const { query } = useSearch();
    const [result, setResult] = useState<any[]>([]);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isSearchOpen , setIsSearchOpen] = useState(false);
    // const apiUrl = `https://api.themoviedb.org/3/search/multi?query=${searchParams}&include_adult=true&language=en-US&page=1`;

    useEffect(() => {
        if (!query) return; // Don't fetch if query is empty
        
        async function fetchData() {
            try {
            const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=1`, {
                headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTZmZmQzYTYyMTU0OTZlNmZjOGEwNmJkZmJmMTU3ZiIsIm5iZiI6MTY0MDQ2MDI2My4wMDEsInN1YiI6IjYxYzc2ZmU2NmY1M2UxMDA0MmU5MDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPqtu0UuHv_j73lG-V0r4fkQhFr2zxebobqLZwkCg4w`, // replace with env var
                },
            });
            if (!res.ok) throw new Error('Failed to fetch data');

            const data = await res.json();
            setIsSearchOpen(true);
            setResult(data.results || []);
            } catch (error) {
            console.error(error);  
            }
        }

        fetchData();
    }, [query]);

    // detect clicks outside the search result
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setIsSearchOpen(false);
        }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        isSearchOpen && (
        <div 
            onClick={() => setIsSearchOpen(false)}
            className='absolute top-16 left-[50%] translate-x-[-50%] container max-w-7xl mx-auto h-[80vh] z-50 rounded-xl'
        >
            <div ref={wrapperRef} className='mx-4 ml-auto p-4 bg-[#0b3546e8]  max-w-[90%] md:max-w-[720px] h-[100%] overflow-y-scroll rounded-2xl shadow-2xs'>
                {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 '> */}
                <div className='flex flex-col justify-start gap-4'>

                {result && (
                    result.map((item: Movie) => {
                    return (
                        <Link key={item.id} href={`/${item.id}`} onClick={() => setIsSearchOpen(false)}>
                        <div  className='flex flex-row gap-4 sm:gap-8'>
                            <div  className="relative aspect-[2/3] w-[120px] rounded-lg overflow-hidden shadow-md cursor-pointer border-1 mg:border-2 border-[#0b3546] hover:border-[#3cd293] transition-all duration-300 ease-in-out">
                                <Image
                                src={item.poster_path ?`https://image.tmdb.org/t/p/w780${item.poster_path}` : "/no-poster.jpg"}
                                alt={item.title || item.name || 'Untitled'}
                                fill
                                className="object-cover"
                                priority
                                />
                            </div>
                            <div className='flex-1'>
                                <h1 className="text-xl md:text-2xl font-bold drop-shadow-lg ">
                                    {item.title || item.name}
                                </h1>
                                <p className="mt-2 m text-sm md:text-md text-white text-shadow-lg line-clamp-3">
                                    {item.overview}
                                </p>
                                <div className='flex flex-row justify-start items-center mt-2 gap-2'>
                                    {item.vote_average && (
                                    <div className='text-sm bg-[#0f455c] text-[#3cd293] p-2 rounded-lg z-50 flex flex-row gap-1 items-center'>
                                        <FaStar className=' text-yellow-400'/>
                                        <span>
                                            {item.vote_average.toString().slice(0, 3)}
                                        </span>
                                    </div>
                                    )}
                                    {item.genre_ids && (
                                        <p className="text-sm md:text-md  font-bold text-green-50 ">
                                            {getMovieGenreNames(item.genre_ids).join(", ")}
                                        </p>
                                    )}
                                </div>
                                

                            </div>
                        </div>
                        </Link>
                    );
                    })
                    
                )}

                </div>
            </div>

        </div>
        )
    )
}