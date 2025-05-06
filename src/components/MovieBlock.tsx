'use client';

import { Movie } from '@/lib/types'
import Image from 'next/image'
import React from 'react'

function MovieBlock({ movie }: { movie: Movie }) {
  return (
    <div className='flex gap-5'>
        <div className="flex-none" >
            <Image className='border border-gray-300 hover:border-amber-500' src={movie.posterUrl} alt={movie.title} width={175} height={300} priority />
        </div>
        <div className='flex flex-col gap-2 text-lg w-full md:w-3/4'>
            <h1 className='text-3xl font-bold'>{movie.title}</h1>
            <p className='hidden sm:block'>{movie.description}</p>
            <p>
  {(() => {
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    
    let result = '';
    
    if (hours > 0) {
      result += `${hours}h `;
    }
    
    if (minutes > 0 || hours === 0) {
      result += `${minutes}min`;
    }
    
    return result.trim();
  })()}
</p>
            <div className='flex gap-2 hidden md:block'>
            {movie.tags.map((tag, index) => (
                <span key={index}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
                {index < movie.tags.length - 1 ? ", " : ""}
              </span>
            ))}
            </div>
            
        </div>
    </div>
  )
}

export default MovieBlock