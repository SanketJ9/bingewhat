"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";
import { useSearch } from "../context/searchContext";

const navLinks = [
  { name: "Find Your Binge", href: "/findyourbinge"},
  { name: "Movies", href: "/movies" },
  { name: "TV", href: "/tv" },
  { name: "Watchlist", href: "/watchlist" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const { setQuery } = useSearch();

  return (
    <header className="absolute top-0 left-0 z-100 w-[100%] text-white ">
      <div className="container max-w-7xl mx-auto h-16 px-4 sm:px-4 lg:px-4 flex justify-between items-center">
        <div className="flex items-center gap-4 lg:gap-12 w-full">
          {/* Logo */}
          <Link href="/" className="" >
            <div className="relative w-[160px] md:w-[180px] lg:w-[200px] h-[40px] md:h-[45px] lg:h-[50px]">
              <Image
                src="/logo.png"    
                alt="Logo"
                fill
                priority              
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
               <Link
                  key={link.name}
                  onClick={() => setIsOpen(false)}
                  href={link.href}
                  className={`text-white text-md font-bold border-b-2 border-transparent py-1 px-2 hover:border-b-[#3cd293] transition-all duration-300 ${
                    // pathname === link.href ? "bg-[#0b3546] text-[#3cd293] border-[#3cd293]" : ""
                    pathname === link.href ? "border-b-2 border-b-[#3cd293]" : ""
                    }`}
                >
                {link.name}
              </Link>
            ))}
          </nav>

          
          <div className="header-search-profile flex justify-end items-center gap-4 flex-1">
            <form className="max-w-md w-full "
              onSubmit={(e) => {
                e.preventDefault();
                setQuery(searchQuery);
                setSearchQuery("");
              }}
            >   
                <div className="relative rounded-lg overflow-hidden border-[#3cd293] border-2 bg-[#0b3546] text-[#3cd293] flex items-center">
                    <input 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)}
                      type="search" 
                      id="default-search" 
                      className="block w-full py-2 px-4 text-sm text-gray-200 border rounded-lg border-none outline-none " placeholder="Search Movies, Tv Series..." 
                      required />
                    <button type="submit" className="absolute top-[50%] right-[4px] translate-y-[-50%] px-2 w-auto h-[80%] bg-[#0f455c] text-[#3cd293] flex justify-center items-center rounded-md cursor-pointer hover:bg-[#3cd293] hover:text-[#0f455c] transition-all ease-in duration-300"><IoSearch className="inline-block text-sm "/></button>
                </div>
            </form>

            <div className="relative hidden lg:flex items-center justify-center py-2 px-4 rounded-xl border-1 border-[#3cd293] bg-[#0f455c] text-[#3cd293] cursor-pointer hover:bg-[#3cd293] hover:text-[#0b3546] transition-colors duration-300 ease-in-out">
              <div>
                <p>Login</p>
              </div>
            </div>

            
            
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden z-100 text-[#3cd293] ml-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RiCloseLine  className="text-3xl"/> : <RiMenu2Fill  className="text-2xl"/>}
        </button>

      </div>

      

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="lg:hidden bg-background absolute top-0 left-0 h-[100vh] w-[100vw] z-60 b px-4 flex flex-col gap-6 bg-[#0b3546]">
          <div className="h-16 flex items-center">
            <Link href="/" className=""  onClick={() => setIsOpen(!isOpen)}>
            <div className="relative w-[160px] md:w-[180px] lg:w-[200px] h-[40px] md:h-[45px] lg:h-[50px]">
              <Image
                src="/logo.png"    
                alt="Logo"
                fill
                priority              
              />
            </div>
            </Link>

          </div>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              onClick={() => setIsOpen(!isOpen)} 
              href={link.href} 
              className={` text-3xl font-bold ${
                pathname === link.href ? "text-[#3cd293]" : ""
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
