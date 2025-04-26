// 'use client';
// import { useState, useEffect } from 'react';

// interface SearchResultsProps {
//     searchParams: string;
// }

// export default function SearchResults({ searchParams }: SearchResultsProps) {
//     const [result, setResult] = useState<any[]>([]);
//     const apiUrl = `https://api.themoviedb.org/3/search/multi?query=${searchParams}&include_adult=true&language=en-US&page=1`;

//     useEffect(() => {
//         async function fetchData() {
//           try {
//             const res = await fetch(apiUrl, {
//               headers: {
//                 Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTZmZmQzYTYyMTU0OTZlNmZjOGEwNmJkZmJmMTU3ZiIsIm5iZiI6MTY0MDQ2MDI2My4wMDEsInN1YiI6IjYxYzc2ZmU2NmY1M2UxMDA0MmU5MDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPqtu0UuHv_j73lG-V0r4fkQhFr2zxebobqLZwkCg4w`, // replace with env var
//               },
//             });
//             if (!res.ok) throw new Error('Failed to fetch data');
    
//             const data = await res.json();
//             setResult(data.results || []);
//           } catch (error) {
//             console.error(error);  
//           }
//         }
    
//         fetchData();
//       }, [apiUrl]);

//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
            
//         </div>
//     )
// }