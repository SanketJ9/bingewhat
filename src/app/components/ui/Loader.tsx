"use client";

import { useLoading } from "../../context/loadingContext";

export default function Loader() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-[#051f29] bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="w-16 h-16 border-4 border-[#3cd293] border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
}
