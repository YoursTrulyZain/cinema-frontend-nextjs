'use client';

import React from 'react'
import SectionHeader from './SectionHeader';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { useAppData } from '@/contexts/AppDataContext';
import { useFilter } from '@/contexts/FilterContext';
function TheatreSection() {
  const { theatres, loading } = useAppData();
  const { openWithTheatre } = useFilter();
    if (loading) {
        return (
          <section className="flex flex-col gap-6 mt-15">
            <SectionHeader title="Movies" />
            <div id="theatre-grid-container" className="flex flex-wrap gap-8">
              <Skeleton className="w-[250px] h-[92px]" />
              <Skeleton className="w-[250px] h-[92px]" />
              <Skeleton className="w-[250px] h-[92px]" />
              <Skeleton className="w-[250px] h-[92px]" />
            </div>
          </section>
        )
        }
  return (
    <section className="flex flex-col gap-6 mt-15">
      <SectionHeader title="Theatres" />
      <div id="theatre-grid-container" className="flex flex-wrap gap-8">
        {theatres.map((theatre) => (
          <Card key={theatre.id} onClick={() => openWithTheatre(theatre)} className='w-[250px] hover:scale-105 transition-all hover:border-amber-500 cursor-pointer'>
            <CardHeader>
                <CardTitle>{theatre.name}</CardTitle>
                <CardDescription>{theatre.location}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default TheatreSection