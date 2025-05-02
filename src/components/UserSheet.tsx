import React from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { IoPersonOutline } from 'react-icons/io5'
import { useAuth } from '@/contexts/AuthContext';
function UserSheet({ userId }: { userId: string }) {
    const { logout } = useAuth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"> <IoPersonOutline />{userId}</Button>
      </SheetTrigger>
      <SheetContent className='bg-black border-amber-500'>
        <SheetHeader>
          <SheetTitle className='text-center'>My Account</SheetTitle>
        </SheetHeader>
        <Button variant="outline" className=' text-white w-[80%] mx-auto cursor-pointer'>Tickets</Button>
        <Button variant="outline" className=' text-white w-[80%] mx-auto cursor-pointer'>Personal Information</Button>
        <Button variant="outline" className='border-red-500 text-white w-[80%] mx-auto cursor-pointer' onClick={logout}>Logout</Button>
        <SheetFooter>
          <p className='text-center text-white'>v1.0</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default UserSheet