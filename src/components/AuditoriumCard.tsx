'use client';

import { Auditorium, ScreeningNormalized } from '@/lib/types'
import React from 'react'
import ScreeningCard from './ScreeningCard';
import { useLoginContext } from '@/contexts/LoginContext';

type AuditoriumGroup = {
    auditorium: Auditorium;
    screenings: ScreeningNormalized[];
}

type AuditoriumCardProps = {
    auditoriumGroup: AuditoriumGroup;
    handleScreeningSelect: (screening: ScreeningNormalized) => void;
}

function AuditoriumCard({auditoriumGroup, handleScreeningSelect}: AuditoriumCardProps) {
  const { openLoginModal, isLoggedIn } = useLoginContext();

  const handleClick = (screening: ScreeningNormalized) => {
    if (isLoggedIn()) {
        handleScreeningSelect(screening);
    } else {
        openLoginModal();
    }
  }

  return (
    <div className='bg-gray-500/50 p-10 flex flex-col gap-5 rounded-md'>
        <div>
            <div className='text-2xl font-bold'>{auditoriumGroup.auditorium.type}</div>
        </div>
        <div className='flex gap-5 flex-wrap'>
            {auditoriumGroup.screenings.sort(
                            (a, b) =>
                              new Date(a.startTime).getTime() -
                              new Date(b.startTime).getTime()
                          ).map((screening) => (
                <ScreeningCard onClick={() => handleClick(screening)} key={screening.id} screening={screening} />
            ))}
        </div>
    </div>
  )
}

export default AuditoriumCard       