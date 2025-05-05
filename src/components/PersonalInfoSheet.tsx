import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/card'
import { User } from '@/lib/types';

function PersonalInfoSheet({ user }: { user: User }) {
    return (
        <Sheet>
          <SheetTrigger asChild>
          <div className='text-center hover:text-blue-500 bg-black w-[300px] py-2 border rounded-full border-white cursor-pointer mx-auto'>Your Information</div>
          </SheetTrigger>
          <SheetContent className='bg-black border-amber-500 w-screen overflow-y-auto max-h-screen'>
            <SheetHeader className='hidden'>
              <SheetTitle className='text-center'>Personal Information</SheetTitle>
              <SheetDescription>View and edit your personal information.</SheetDescription>
            </SheetHeader>
            <div className='text-white text-4xl font-bold mx-15 my-5'>Your Information</div>
            <div id="theatre-grid-container" className="flex flex-wrap gap-8 mx-15">
                
          <Card key={user?.id} className='w-[300px] hover:scale-105 transition-all hover:border-amber-500 cursor-pointer'>
            <CardHeader className='hidden'>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>View and edit your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
            <span className='font-bold text-amber-500'>Name:</span> {user?.name} <br/>
            <span className='font-bold text-amber-500'>Email:</span> {user?.email} <br/>
            <span className='font-bold text-amber-500'>Phone:</span> {user?.phone}
            </CardContent>
            <CardFooter>
                <p><span className='font-bold text-amber-500'>User ID:</span> {user?.id}</p>
            </CardFooter>
          </Card>
    
      </div>
            <SheetFooter>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )
}

export default PersonalInfoSheet