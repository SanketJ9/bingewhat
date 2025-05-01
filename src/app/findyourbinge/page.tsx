'use client';

import { useState } from 'react';
import { movieGenres } from '../Constants/genres';
// import { productionCompanies } from '../Constants/company';
import Image from 'next/image';
import Link from 'next/link';

type Media = {
  id: number;
  backdrop_path: string;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
};

export default function FindYourBinge() {
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  // const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [includeAdult, setIncludeAdult] = useState(false);
  const [result, setResult] = useState<Media[] | null>(null);
  const [error , setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const values = Array.from(e.target.selectedOptions, (option) => Number(option.value));
  //   setSelectedGenres(values);
  // };

  // const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const values = Array.from(e.target.selectedOptions, (option) => Number(option.value));
  //   setSelectedCompanies(values);
  // };

  const handleFetch = async () => {
    setLoading(true);
    setResult(null); // Clear previous result
  
    const genreParam = selectedGenres.join(',');
    // const companyParam = selectedCompanies.join(',');
    const adultParam = includeAdult ? 'true' : 'false';
  
    const query = new URLSearchParams({
      sort_by: 'popularity.desc',
      include_adult: adultParam,
    });
  
    if (genreParam) query.append('with_genres', genreParam);
    // if (companyParam) query.append('with_companies', companyParam);
  
    const url = `https://api.themoviedb.org/3/discover/${mediaType}?${query.toString()}`;

    console.log('Fetching URL:', url); // ✅ See the URL being fetched
  
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTZmZmQzYTYyMTU0OTZlNmZjOGEwNmJkZmJmMTU3ZiIsIm5iZiI6MTY0MDQ2MDI2My4wMDEsInN1YiI6IjYxYzc2ZmU2NmY1M2UxMDA0MmU5MDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPqtu0UuHv_j73lG-V0r4fkQhFr2zxebobqLZwkCg4w`,
        },
      });
  
      const data = await res.json();
  
      console.log('Fetched data:',data.results); // ✅ See what you got
  
      if (!data.results || data.results.length === 0) {
        alert('No results found! Try different filters.');
        setResult(null);
        return;
      }
      
      // const random = data.results[Math.floor(Math.random() * data.results.length)];
      setResult(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
       

        <div className='bg-[#051f29] text-white p-6 rounded-2xl shadow-xl max-w-7xl mx-auto mt-20'>
          
            <h2 className="text-4xl font-bold text-left md:text-center mb-6  text-[#3cd293]">Find Your Binge</h2>

            {/* Media Type Toggle */}
            <div className="flex self-start md:self-center gap-4 mb-4 md:mb-6 ">
              {['movie', 'tv'].map((type) => (
                <button
                  key={type}
                  onClick={() => setMediaType(type as 'movie' | 'tv')}
                  className={`px-4 py-2 rounded font-semibold ${
                    mediaType === type ? 'bg-[#3cd293] text-[#0b3546]' : 'bg-[#0b3546] text-[#3cd293]'
                  }`}
                >
                  {type === 'movie' ? 'Movies' : 'TV Shows'}
                </button>
              ))}
            </div>


            {/* Genre Dropdown */}
            <div className="mb-6">
              <h4 className='text-xl text-[#3cd293] font-bold pb-2 '>Genres</h4>
              <div className='flex flex-wrap gap-2'>  
                {movieGenres.map((genre) => {
                    const selected = selectedGenres.includes(genre.id);
                    return (
                      <button
                        key={genre.id}
                        onClick={() =>
                          setSelectedGenres((prev) =>
                            selected ? prev.filter((id) => id !== genre.id) : [...prev, genre.id]
                          )
                        }
                        className={`px-4 py-2 text-sm rounded font-semibold ${
                          selected ? 'bg-[#3cd293] text-[#0b3546]' : 'bg-[#0b3546] text-[#3cd293]'
                        }`}
                      >
                        {genre.name}
                      </button>
                    );
                  })}
                </div>
            </div>


            {/* Adult Content Toggle */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                checked={includeAdult}
                onChange={() => setIncludeAdult((prev) => !prev)}
                id="adult"
                className="mr-2"
              />
              <label htmlFor="adult" className="text-sm">Include Adult Content</label>
            </div>

            <button
              onClick={handleFetch}
              className="bg-[#3cd293] text-[#0b3546] hover:bg-[#0b3546] hover:text-[#3cd293] px-6 py-3 rounded font-bold disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Finding...' : 'Find My Binge'}
            </button>

            <div>
              {error && <p className="text-[#3cd293]mt-4">{error}</p>}
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-16'>
              {result && (
                result.map((item: Media) => {
                  return (
                    <div key={item.id} className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-md cursor-pointer border-1 mg:border-2 border-[#0b3546] hover:border-[#3cd293] transition-all duration-300 ease-in-out">
                      <Link href={`/${item.title ? 'movie' : 'tv'}/${item.id}`}>
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
                      </Link>
                    </div>
                  );
                })
                
              )}

            </div>
        </div>
      </>

  );
}
