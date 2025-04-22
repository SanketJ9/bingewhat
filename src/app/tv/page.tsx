
import Banner from "../components/Banner";
import CommonSlider from "../components/ui/commonSlider";

export default async function TvPage() {
  // const movies = await fetchMovies();

  return (
    <>
        <Banner apiUrl="https://api.themoviedb.org/3/trending/all/week?language=en-US"/>

        <div className="container max-w-7xl mx-auto flex flex-col gap-2 mt-10">
            <h3 className="text-4xl font-bold">Talk of the Town</h3>
            <CommonSlider apiUrl="https://api.themoviedb.org/3/trending/tv/day?language=en-US" />
        </div>

        <div className="container max-w-7xl mx-auto flex flex-col gap-2 mt-4">
            <h3 className="text-4xl font-bold">Best of TV</h3>
            <CommonSlider apiUrl="https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1" />
        </div>

        <div className="container max-w-7xl mx-auto flex flex-col gap-2 mt-4">
            <h3 className="text-4xl font-bold">People's Favorite</h3>
            <CommonSlider apiUrl="https://api.themoviedb.org/3/tv/popular?language=en-US&page=1" />
        </div>

        <div className="container max-w-7xl mx-auto flex flex-col gap-2 mt-4">
            <h3 className="text-4xl font-bold">Currently Airing</h3>
            <CommonSlider apiUrl="'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1" />
        </div>

    </>
  );
}
// Compare this snippet from bingewhat/src/app/movies/[id]/page.tsx: