'use client';

import React from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { IoPersonOutline } from 'react-icons/io5'
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/lib/types';
import UserTicketSheet from './UserTicketSheet';
import PersonalInfoSheet from './PersonalInfoSheet';
function UserSheet({ user }: { user: User }) {
    const { logout } = useAuth();
  return (
    <Sheet>
      <SheetTrigger asChild>
      <div className='flex gap-2 items-center hover:text-blue-500 bg-black px-10 py-2 border rounded-full border-white cursor-pointer'><IoPersonOutline/> {user.name}</div>
      </SheetTrigger>
      <SheetContent className='bg-black border-amber-500 sm:max-w-sm'>
        <SheetHeader className='hidden'>
          <SheetTitle className='text-center'>My Account</SheetTitle>
          <SheetDescription>Menu for user to view tickets, manage personal information and logout.</SheetDescription>
        </SheetHeader>
        <div className='text-white text-2xl font-bold text-center mt-2 mb-5'>My Account</div>
        <UserTicketSheet user={user}/>
        <PersonalInfoSheet user={user}/>
        <SheetFooter>
            <Button variant="outline" className='border-red-500 text-white w-[80%] mx-auto cursor-pointer hover:bg-red-500' onClick={logout}>Logout</Button>
          <p className='text-center text-white'>v1.0</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default UserSheet