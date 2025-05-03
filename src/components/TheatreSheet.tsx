import React from 'react'
import { Sheet, SheetHeader, SheetContent, SheetTrigger, SheetTitle, SheetFooter, SheetDescription } from './ui/sheet'
import { IoLocationOutline } from 'react-icons/io5'
import TheatreSection from './TheatreSection'
function TheatreSheet() {
    return (
        <Sheet>
          <SheetTrigger asChild>
          <div className='flex items-center justify-between bg-gray-500/50 flex-1 min-w-[200px] rounded-md px-5 py-2 mx-15 border-2 border-transparent hover:border-amber-500 cursor-pointer'>
        <div className=' flex flex-col gap-1'>
          <div className=''>Theatre</div>
          <div className='text-2xl'>Downtown Cinema</div>
        </div>
        <div className='text-3xl'>
          <IoLocationOutline />
        </div>
    </div>
          </SheetTrigger>
          <SheetContent className='bg-gradient-to-b from-black via-[#4169e1] to-black border-none w-screen'>
            <SheetHeader className='hidden'>
              <SheetTitle className='text-5xl mx-10 mt-10'>Theatres</SheetTitle>
              <SheetDescription>Select a theatre to see showtimes</SheetDescription>
            </SheetHeader>
            <div className='mx-10'>
                <TheatreSection />
            </div>
            <SheetFooter>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )
}

export default TheatreSheet