import { ScreeningNormalized } from '@/lib/types'
import React from 'react'

function ScreeningCard({ screening }: { screening: ScreeningNormalized }) {
  return (
    <div className='bg-blue-500 px-5 py-2 rounded-md'>
      {new Date(screening.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  )
}

export default ScreeningCard