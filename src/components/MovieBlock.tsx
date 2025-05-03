import { Movie } from '@/lib/types'
import Image from 'next/image'
import React from 'react'

function MovieBlock({ movie }: { movie: Movie }) {
  return (
    <div>
        <div>
            <Image className='border border-gray-300 hover:border-amber-500' src="/the-dark-knight.jpg" alt="The Dark Knight" width={272} height={408} />
        </div>
        <div>
            <h1>Movie Title</h1>
            <p>Movie Description</p>
            <p>Movie Duration</p>
            <p>tags</p>
        </div>
    </div>
  )
}

export default MovieBlock