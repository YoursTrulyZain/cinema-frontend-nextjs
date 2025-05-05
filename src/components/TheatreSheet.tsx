'use client';

import React, { useState } from 'react'
import { Sheet, SheetHeader, SheetContent, SheetTrigger, SheetTitle, SheetFooter, SheetDescription } from './ui/sheet'
import { IoLocationOutline } from 'react-icons/io5'
import TheatreSection from './TheatreSection'
import { CardDescription, CardHeader, CardTitle } from './ui/card'
import { Card } from './ui/card'
import { useAppData } from '@/contexts/AppDataContext'
import { useFilter } from '@/contexts/FilterContext'
import { Theatre } from '@/lib/types'
function TheatreSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const { theatres } = useAppData();
  const { selectedTheatre, setSelectedTheatre } = useFilter();

  function handleTheatreClick(theatre: Theatre | null) {
    setSelectedTheatre(theatre);
    setIsOpen(false);
  }
  
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
          <div className='flex items-center justify-between bg-gray-500/50 flex-1 min-w-[200px] rounded-md px-5 py-2 mx-15 border-2 border-transparent hover:border-amber-500 cursor-pointer'>
        <div className=' flex flex-col gap-1'>
          <div className=''>Theatre</div>
          <div className='text-2xl'>{selectedTheatre ? selectedTheatre.name : 'All Theatres'}</div>
        </div>
        <div className='text-3xl'>
          <IoLocationOutline />
        </div>
    </div>
          </SheetTrigger>
          <SheetContent className='bg-gradient-to-b from-black via-[#4169e1] to-black border-none w-screen'>
            <SheetHeader className='hidden'>
              <SheetTitle className='text-5xl mx-10 mt-10'>Select a Theatre</SheetTitle>
              <SheetDescription>Select a theatre to see showtimes</SheetDescription>
            </SheetHeader>
            <h2 className="text-4xl font-bold my-10 mx-10">Select a Theatre</h2>
            <div className='mx-10 flex flex-wrap gap-8'>
            <div className='flex flex-col gap-2 hover:scale-105 transition-all'>
            <Card onClick={() => handleTheatreClick(null)} className='w-[250px] hover:scale-105 transition-all hover:border-amber-500 cursor-pointer'>
            <CardHeader>
                <CardTitle className='text-2xl'>View All Theatres</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
          </Card>
                </div>
              {theatres.map((theatre) => (
          <Card key={theatre.id} onClick={() => handleTheatreClick(theatre)} className='w-[250px] hover:scale-105 transition-all hover:border-amber-500 cursor-pointer'>
            <CardHeader>
                <CardTitle>{theatre.name}</CardTitle>
                <CardDescription>{theatre.location}</CardDescription>
            </CardHeader>
          </Card>
        ))}
            </div>
            <SheetFooter>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )
}

export default TheatreSheet