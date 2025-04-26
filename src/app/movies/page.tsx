
import Banner from "../components/Banner";
import CommonSlider from "../components/ui/commonSlider";

// const API_URL = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";

// async function fetchMovies() {
//   const res = await fetch(`${API_URL}`, {
//     headers: {
//         Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTZmZmQzYTYyMTU0OTZlNmZjOGEwNmJkZmJmMTU3ZiIsIm5iZiI6MTY0MDQ2MDI2My4wMDEsInN1YiI6IjYxYzc2ZmU2NmY1M2UxMDA0MmU5MDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPqtu0UuHv_j73lG-V0r4fkQhFr2zxebobqLZwkCg4w',

//     },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch movies");
//   }

//   const data = await res.json();
//   return data.results;
// }

export default async function MoviesPage() {
  // const movies = await fetchMovies();

  return (
    <>
      <Banner apiUrl="https://api.themoviedb.org/3/trending/movie/week?language=en-US"/>
      
      <div className="container max-w-7xl mx-auto flex flex-col gap-2 px-4 mt-10">
          <CommonSlider heading="Cinema's Finest" apiUrl="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1" />
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-2 px-4 mt-4">
          <CommonSlider heading="Fan Favouites" apiUrl="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1" />
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-2 px-4 mt-4">
          <CommonSlider heading="In Nearest Theatre" apiUrl="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1" />
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-2 px-4 mt-4">
          <CommonSlider heading="Upcoming Movies" apiUrl="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1" />
      </div>
    </>
  );
}