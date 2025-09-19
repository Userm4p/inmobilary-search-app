import { Loader as LoaderSVG } from 'lucide-react';
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-4 w-full">
      <LoaderSVG className="w-10 h-10 text-white animate-spin" />
      <span className="ml-2 text-sm text-white">Loading</span>
    </div>
  );
};

export default Loader;
