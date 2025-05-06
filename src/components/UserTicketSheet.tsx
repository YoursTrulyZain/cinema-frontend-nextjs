import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { TicketData, User } from '@/lib/types'
import { CardContent, CardDescription, CardFooter } from './ui/card'
import { CardHeader, CardTitle } from './ui/card'
import { Card } from './ui/card'
function UserTicketSheet({ user }: { user: User }) {
    const [ticketsData, setTicketsData] = useState<TicketData[]>([])

    useEffect(() => {
        if (!user || !user.tickets || user.tickets.length === 0) return;
      
        const fetchData = async () => {
          try {
            const responses = await Promise.all(
              user.tickets.map(ticket =>
                fetch(`https://api.cinema.z41n.dev/ticket/detail/${ticket.id}`)
              )
            );
      
            const jsonData = await Promise.all(
              responses.map(async (res) => {
                if (!res.ok) {
                  const errorText = await res.text();
                  throw new Error(`Ticket fetch failed: ${res.status} - ${errorText}`);
                }
                return res.json();
              })
            );
      
            setTicketsData(jsonData);
          } catch (error) {
            console.error('Error fetching ticket data:', error);
          }
        };
      
        fetchData();
      }, [user]);
      
    return (
        <Sheet>
          <SheetTrigger asChild>
          <div className='text-center hover:text-blue-500 bg-black w-[300px] py-2 border rounded-full border-white cursor-pointer  mx-auto'>Your Tickets</div>
          </SheetTrigger>
          <SheetContent className='bg-black border-amber-500 w-screen overflow-y-auto max-h-screen'>
            <SheetHeader className='hidden'>
              <SheetTitle className='text-center'>My Account</SheetTitle>
              <SheetDescription>Menu for user to view tickets, manage personal information and logout.</SheetDescription>
            </SheetHeader>
            <div className='text-white text-4xl font-bold mx-15 my-5'>Your Tickets</div>
            {ticketsData.length === 0 ? (
              <div className='text-center text-white text-4xl font-bold mx-15 my-5'>You have no tickets</div>
            ) : (
              <div id="theatre-grid-container" className="flex flex-wrap gap-8 mx-15">
        {ticketsData.map((ticketData) => (
          <Card key={ticketData.id} className='w-[300px] hover:scale-105 transition-all hover:border-amber-500 cursor-pointer'>
            <CardHeader>
                <CardTitle><span className='font-bold text-amber-500'>Theatre:</span> {ticketData.seat.auditorium.theatre.name} </CardTitle>
                <CardDescription><span className='font-bold text-amber-500'>Aud:</span> {ticketData.seat.auditorium.number} <span className='font-bold text-amber-500'>Row:</span> {ticketData.seat.row} <span className='font-bold text-amber-500'>Seat:</span> {ticketData.seat.number}</CardDescription>
            </CardHeader>
            <CardContent>
                <p><span className='font-bold text-amber-500'>Movie:</span> {ticketData.screening.movie.title}</p>
                <p><span className='font-bold text-amber-500'>Tags:</span> {ticketData.screening.movie.tags.join(', ')}</p>
                <p><span className='font-bold text-amber-500'>Duration:</span> {ticketData.screening.movie.duration} minutes</p>
                <p><span className='font-bold text-amber-500'>Start Time:</span> {new Date(ticketData.screening.startTime).toLocaleTimeString()}</p>
                <p><span className='font-bold text-amber-500'>Purchase Date:</span> {new Date(ticketData.purchasedAt).toLocaleDateString()}</p>
            </CardContent>
            <CardFooter>
                <p><span className='font-bold text-amber-500'>Ticket ID:</span> {ticketData.id}</p>
            </CardFooter>
          </Card>
                ))}
                </div>
            )}
            <SheetFooter>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )
}

export default UserTicketSheet