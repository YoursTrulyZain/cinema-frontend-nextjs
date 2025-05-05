'use client';

import { ScreeningNormalized } from '@/lib/types'
import React from 'react'

type ScreeningCardProps = {
    screening: ScreeningNormalized;
    onClick: () => void;
}

function ScreeningCard({ screening, onClick }: ScreeningCardProps) {
  return (
    <div onClick={onClick} className='bg-blue-500 px-5 py-2 rounded-md cursor-pointer hover:bg-blue-600'>
      {new Date(screening.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  )
}

export default ScreeningCard

//Need user, seat and screening id to buy ticket