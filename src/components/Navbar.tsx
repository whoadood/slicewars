import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="bg-slate-800 flex flex-col py-2 text-white font-bold justify-center items-center">
      <div>
        <h1 className="gochi text-center sm:text-6xl  md:text-8xl text-4xl">
          🍕
          <span className="bg-gradient-to-b text-transparent bg-clip-text inline outline-4 from-white via-yellow-400 to-red-600 drop-shadow-lg">
            Slice Wars
          </span>
          🍕
        </h1>
        <h2 className="text-white text-center text-md sm:text-3xl">
          Two slices enter, one slice leaves
        </h2>
        <div className="flex items-center mt-4 gap-2 text-slate-300 justify-center">
          <Link href="/">
            <a className=" hover:text-white">Home</a>
          </Link>
          <Link href="/results">
            <a className=" hover:text-white">Results</a>
          </Link>
        </div>
      </div>
    </header>
  );
}
