import { Auditorium, ScreeningNormalized } from '@/lib/types'
import React from 'react'
import ScreeningCard from './ScreeningCard';

function AuditoriumCard({auditoriumGroup}: {auditoriumGroup: {
    auditorium: Auditorium;
    screenings: ScreeningNormalized[];
}}) {
  return (
    <div className='bg-gray-500/50 p-10 flex flex-col gap-5 min-w-[800px] rounded-md'>
        <div>
            <div className='text-2xl font-bold'>{auditoriumGroup.auditorium.type}</div>
        </div>
        <div className='flex gap-5'>
            {auditoriumGroup.screenings.sort(
                            (a, b) =>
                              new Date(a.startTime).getTime() -
                              new Date(b.startTime).getTime()
                          ).map((screening) => (
                <ScreeningCard key={screening.id} screening={screening} />
            ))}
        </div>
    </div>
  )
}

export default AuditoriumCard       