import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { RiMovie2Line } from 'react-icons/ri'
import MovieSection from './MovieSection'

function MovieSheet() {
    return (
        <Sheet>
          <SheetTrigger asChild>
          <div className='flex items-center justify-between bg-gray-500/50 flex-1 min-w-[200px] rounded-md px-5 py-2 mx-15 border-2 border-transparent hover:border-amber-500 cursor-pointer'>
        <div className=' flex flex-col gap-1'>
          <div className=''>Movie</div>
          <div className='text-2xl'>Sinners</div>
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
            <div className='mx-10'>
                <MovieSection />
            </div>
            <SheetFooter>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )
}

export default MovieSheet