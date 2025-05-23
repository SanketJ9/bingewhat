import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Gabarito, Nunito } from 'next/font/google'
import SearchResults from "./components/SearchResults";
import SearchProvider from "./context/searchContext"

import LoadingProvider  from "./context/loadingContext";
import Loader from './components/ui/Loader';

const gabarito = Gabarito({
  subsets: ['latin'],
  weight: ['400', '700', '900'], // Adjust weights as needed
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900', '1000'], // Customize as needed
  style: ['normal', 'italic'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "BingeWhat",
  description: "FInd Your Binge before the food gets cold",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gabarito.className} ${nunito.className} bg-[#051f29] text-[#3cd293]`}>
        <LoadingProvider>
          <SearchProvider>
            <Loader/>
            <Header />
            <main className="relative mx-auto">{children}</main>
            <SearchResults />
            <Footer />
          </SearchProvider>
        </LoadingProvider>

      </body>
    </html>
  );
}
