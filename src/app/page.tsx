import Image from "next/image";
import Link from "next/link";
import Banner from "./components/Banner";
import Button from "./components/ui/Button";
import CommonSlider from "./components/ui/commonSlider";

export default function Home() {
  return (
    <>
      <Banner apiUrl="https://api.themoviedb.org/3/trending/movie/week?language=en-US"/>
      
      <div className="container max-w-7xl mx-auto flex flex-row justify-between rounded-2xl overflow-hidden" >
          <div className="relative overflow-hidden max-w-[800px] w-[50%]">
            <Image
              src="/fybleft.jpg"    
              alt="findyourbinge"
              fill
              className="object-cover"
              priority        
            />
              <div className="absolute inset-0 bg-gradient-to-l from-[#0b3546] via-transparent to-[#0b3546]/20" />
          </div>
          <div className="bg-[#0b3546] w-[50%] py-6 px-4">
            <h2 className="text-xl font-bold text-[#3cd293] ">Find Your Binge Before Your Food Gets Cold</h2>
            <p className="text-sm text-green-200 my-2">No more 45-minute scroll sessions. get straight to the good stuff while your fries are still crispy. Let us help you pick your binge faster than you can say “What do you wanna watch?”</p>
            <Link href="/findyourbinge" >
              <Button className="font-bold">Find Yo Binge !</Button>
            </Link> 
          </div> 

      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-2 mt-20">
          <h3 className="text-4xl font-bold">Critic's Choice</h3>
          <CommonSlider apiUrl="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1" />
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-2 mt-4">
          <h3 className="text-4xl font-bold">Trending on TV</h3>
          <CommonSlider apiUrl="https://api.themoviedb.org/3/trending/tv/day?language=en-US" />
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-2 mt-4">
          <h3 className="text-4xl font-bold">In Nearest Theatre</h3>
          <CommonSlider apiUrl="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1" />
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-2 mt-4">
          <h3 className="text-4xl font-bold">Best of TV</h3>
          <CommonSlider apiUrl="https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1" />
      </div>
    </>
  );
}
