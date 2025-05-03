import React from 'react'
import { Sheet, SheetHeader, SheetContent, SheetTrigger, SheetTitle, SheetFooter } from './ui/sheet'
import { IoCalendarOutline } from 'react-icons/io5'
function DateSheet() {
    return (
        <Sheet>
          <SheetTrigger asChild>
          <div className='flex items-center justify-between bg-gray-500/50 flex-1 min-w-[200px] rounded-md px-5 py-2 mx-15 border-2 border-transparent hover:border-amber-500 cursor-pointer'>
        <div className=' flex flex-col gap-1'>
          <div className=''>Date</div>
          <div className='text-2xl'>2025-05-02</div>
        </div>
        <div className='text-3xl'>
          <IoCalendarOutline />
        </div>
    </div>
          </SheetTrigger>
          <SheetContent className='bg-gradient-to-b from-black via-[#4169e1] to-black border-none w-screen'>
            <SheetHeader>
              <SheetTitle className='text-5xl mx-10 mt-10'>Tickets</SheetTitle>
            </SheetHeader>
            <div className='flex flex-col gap-5 lg:flex-row'>
            </div>
            
            <SheetFooter>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )
}

export default DateSheet