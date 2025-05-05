'use client';

import React from 'react'

function SectionHeader({ title }: { title: string }) {
  return (
    <div id={`${title}-section-header`}>
        <h2 className="text-4xl font-bold">{title}</h2>
    </div>
  )
}

export default SectionHeader