'use client';

import React, { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { RiMovie2Line } from 'react-icons/ri'
import { useAppData } from '@/contexts/AppDataContext';
import Image from 'next/image';
import { Movie } from '@/lib/types';
import { useFilter } from '@/contexts/FilterContext';

function MovieSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const { movies } = useAppData();
  const { setSelectedMovie, selectedMovie } = useFilter();

  function handleMovieClick(movie: Movie | null) {
    setSelectedMovie(movie);
    setIsOpen(false);
  }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
          <div className='flex items-center justify-between bg-gray-500/50 flex-1 min-w-[200px] rounded-md px-5 py-2 mx-15 border-2 border-transparent hover:border-amber-500 cursor-pointer'>
        <div className=' flex flex-col gap-1'>
          <div className=''>Movie</div>
          <div className='text-2xl'>{selectedMovie ? selectedMovie.title : 'All Movies'}</div>
        </div>
        <div className='text-3xl'>
          <RiMovie2Line />
        </div>
    </div>
          </SheetTrigger>
          <SheetContent className='bg-gradient-to-b from-black via-[#4169e1] to-black border-none w-screen'>
            <SheetHeader className='hidden'>
              <SheetTitle className='text-5xl mx-10 mt-10'>Movies</SheetTitle>
              <SheetDescription>Select a movie to see showtimes</SheetDescription>
            </SheetHeader>
            <h2 className="text-4xl font-bold my-10 mx-10">Movies</h2>
            <div className='mx-10 flex flex-wrap gap-8'>
            <div className='flex flex-col gap-2 hover:scale-105 transition-all'>
                  <Image onClick={() => handleMovieClick(null)} className='border border-gray-300 hover:border-amber-500 cursor-pointer' src="/view-all-movies.png" alt="All Movies" width={272} height={408} />
                  <p>All Movies</p>
                </div>
              {movies.map((movie) => (
                <div key={movie.id} className='flex flex-col gap-2 hover:scale-105 transition-all'>
                  <Image onClick={() => handleMovieClick(movie)} className='border border-gray-300 hover:border-amber-500 cursor-pointer' src="/the-dark-knight.jpg" alt={movie.title} width={272} height={408} />
                  <p>{movie.title}</p>
                </div>
              ))}
            </div>
            <SheetFooter>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )
}

export default MovieSheet