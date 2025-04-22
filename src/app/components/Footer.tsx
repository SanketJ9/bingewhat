// src/components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

const footerLinks = [
    { name: "Find Your Binge", href: "/findyourbinge" },
    { name: "Movies", href: "/movies" },
    { name: "TV", href: "/tv" },
    { name: "Watchlist", href: "/watchlist" },
  ];

export default function Footer() {
  return (
    <footer className="bg-[#0b3546] text-[#3cd293] py-8 mt-16 border-t-2 border-[#3cd293]">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col justify-around mb-8">
            <div>
            <Link href="/" className="" >
                <Image
                    src="/logo.png"    
                    alt="Logo"
                    width={300}
                    height={150}
                    priority              
                />
            </Link>
            </div>
            <div className="flex gap-2 text-2xl font-bold flex-col mt-6">
                {footerLinks.map((link) => (
                    <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-gray-300 transition-colors"
                    >
                    {link.name}
                    </Link>
                ))}
            </div>
        </div>
      <div className="container max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-end text-sm">
        <p className="mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} Find Your Binge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
