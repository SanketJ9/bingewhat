import Image from "next/image";
import Link from "next/link";
import Banner from "./components/Banner";
import Button from "./components/ui/Button";
import CommonSlider from "./components/ui/commonSlider";

export default function Home() {
  return (
    <>
      <Banner apiUrl="https://api.themoviedb.org/3/trending/movie/week?language=en-US"/>
      
      <div className="container max-w-7xl mx-auto px-4 mt-10">
        <div className="relative flex flex-row justify-between rounded-2xl overflow-hidden box-border" >
            <div className="absolute w-full h-full -z-10 top-0 left-0 overflow-hidden ">
              <Image
                src="/fybleft.jpg"    
                alt="findyourbinge"
                fill
                className="object-cover"
                priority        
              />
                <div className="absolute inset-0 bg-[#0b354692]" />
            </div>
            <div className="w-[100%]  py-6 px-4 md:w-[60%] ">
              <h2 className="text-xl text-center md:text-left font-bold text-[#3cd293] ">Find Your Binge Before Your Food Gets Cold</h2>
              <p className="text-sm text-center md:text-left text-green-200 mt-2 mb-4">No more 45-minutes scroll sessions. get straight to the good stuff while your fries are still crispy. Let us help you pick your binge faster than you can say “What do you wanna watch?”</p>
              <div className="text-center mt-2 md:text-left">
                <Link href="/findyourbinge">
                  <Button className="font-bold">Find Yo Binge !</Button>
                </Link> 
              </div>
            </div> 

        </div>
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-2 px-4 mt-10">
          <CommonSlider heading="Critic's Choice" apiUrl="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1" />
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-2 px-4 mt-4">
          <CommonSlider heading="Trending on TV" apiUrl="https://api.themoviedb.org/3/trending/tv/day?language=en-US" />
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-2 px-4 mt-4">
          <CommonSlider heading="In Nearest Theatre" apiUrl="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1" />
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-2 px-4 mt-4">
          <CommonSlider heading="Best of TV" apiUrl="https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1" />
      </div>
    </>
  );
}
