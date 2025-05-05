'use client';

import React, { useState } from 'react'
import { Sheet, SheetHeader, SheetContent, SheetTrigger, SheetTitle, SheetFooter, SheetDescription } from './ui/sheet'
import { IoCalendarOutline } from 'react-icons/io5'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useFilter } from '@/contexts/FilterContext'
import { useAppData } from '@/contexts/AppDataContext'
function DateSheet() {
    const { dates } = useAppData();
    const { setSelectedDate, selectedDate } = useFilter();
    const [isOpen, setIsOpen] = useState(false);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setIsOpen(false);
    }
    
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
          <div className='flex items-center justify-between bg-gray-500/50 flex-1 min-w-[200px] rounded-md px-5 py-2 mx-15 border-2 border-transparent hover:border-amber-500 cursor-pointer'>
        <div className=' flex flex-col gap-1'>
          <div className=''>Date</div>
          <div className='text-2xl'>{selectedDate ? formatDate(selectedDate) : 'Select a date'}</div>
        </div>
        <div className='text-3xl'>
          <IoCalendarOutline />
        </div>
    </div>
          </SheetTrigger>
          <SheetContent className='bg-gradient-to-b from-black via-[#4169e1] to-black border-none w-screen'>
            <SheetHeader className='hidden'>
              <SheetTitle className='text-5xl mx-10 mt-10'>Select a Date</SheetTitle>
              <SheetDescription>Select a date to see showtimes</SheetDescription>
            </SheetHeader>
            <h2 className="text-4xl font-bold my-10 mx-10">Select a Date</h2>
            <div className='mx-10 flex flex-wrap gap-8'>   
              {dates.map((date) => (
          <Card key={date.toISOString()} onClick={() => handleDateClick(date)} className='w-[250px] hover:scale-105 transition-all hover:border-amber-500 cursor-pointer'>
            <CardHeader>
                <CardTitle>{date.toLocaleDateString('en-US', { weekday: 'long' })}</CardTitle>
                <CardDescription>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
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

export default DateSheet