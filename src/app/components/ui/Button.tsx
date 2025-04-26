'use client';

import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ children, onClick, className = '', type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-[#0f455c] text-[#3cd293] hover:bg-[#3cd293] hover:text-[#0f455c] border-1 sm:border-2 border-[#3cd293] hover:border-[#0f455c] transition duration-300 ${className} cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;