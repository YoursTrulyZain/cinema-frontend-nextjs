'use client';

import { useFilter } from '@/contexts/FilterContext';
import { Movie } from '@/lib/types'
import Image from 'next/image'
import React from 'react'

function MovieCard({ movie }: { movie: Movie }) {
  const { openWithMovie } = useFilter();
  return (
    <div className='flex flex-col gap-2 hover:scale-105 transition-all'>
        <Image onClick={() => openWithMovie(movie)} className='border border-gray-300 hover:border-amber-500 cursor-pointer' src="/the-dark-knight.jpg" alt={movie.title} width={272} height={408} />
        <p>{movie.title}</p>
    </div>
  )
}

export default MovieCard