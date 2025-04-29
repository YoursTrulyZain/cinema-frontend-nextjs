import { Movie } from '@/lib/types'
import Image from 'next/image'
import React from 'react'

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className='w-[272px] h-[515.15px] flex flex-col gap-2'>
        <Image className='border border-gray-300' src={movie.image} alt={movie.title} width={272} height={408} />
        <p>{movie.title}</p>
    </div>
  )
}

export default MovieCard