import { Movie } from '@/lib/types'
import Image from 'next/image'
import React from 'react'

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className='flex flex-col gap-2 hover:scale-105 transition-all'>
        <Image className='border border-gray-300 hover:border-amber-500' src="/the-dark-knight.jpg" alt={movie.title} width={272} height={408} />
        <p>{movie.title}</p>
    </div>
  )
}

export default MovieCard