"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Find Your Binge", href: "/findyourbinge"},
  { name: "Movies", href: "/movies" },
  { name: "TV", href: "/tv" },
  { name: "Watchlist", href: "/watchlist" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="absolute top-0 left-0 z-100 w-[100%] text-white">
      <div className="container max-w-7xl mx-auto h-16 px-4 sm:px-4 lg:px-4 flex justify-between items-center">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="" onClick={() => setIsOpen(!isOpen)}>
          <Image
            src="/logo.png"    
            alt="Logo"
            width={200}
            height={100}
            priority              
          />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
               <Link
                  key={link.name}
                  onClick={() => setIsOpen(false)}
                  href={link.href}
                  className={`text-white text-lg font-bold hover:text-gray-300 py-1 px-2  ${
                    // pathname === link.href ? "bg-[#0b3546] text-[#3cd293] border-[#3cd293]" : ""
                    pathname === link.href ? "border-b-2 border-b-[#3cd293]" : ""
                    }`}
                >
                {link.name}
              </Link>
            ))}
          </nav>
          
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-100" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div>
        
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-background absolute top-0 left-0 h-[100vh] w-[100vw] z-60 b p-4 flex flex-col gap-6">
          <div className="h-16">
            <Link href="/" className="pb-4"  onClick={() => setIsOpen(!isOpen)}>
            <Image
              src="/logo.png"    
              alt="Logo"
              width={200}
              height={100}
              priority              
            />
            </Link>

          </div>
          {navLinks.map((link) => (
            <Link key={link.name} onClick={() => setIsOpen(!isOpen)} href={link.href} className="text-white text-4xl font-bold hover:text-gray-300">
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
