import { Logo } from '@/components/Logo/Logo';
import Link from 'next/link';
import React from 'react';
export const Header = () => {
  return (
    <div className="flex flex-row items-center px-4 py-4 gap-4 color-black w-full">
      <Link href={'/'} className="flex flex-row items-center gap-2">
        <Logo />
      </Link>
    </div>
  );
};
