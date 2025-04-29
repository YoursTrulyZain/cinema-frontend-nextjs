"use client";

import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Theatre } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

function TheatreSection() {
    const [theatres, setTheatres] = useState<Theatre[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTheatres = async () => {
            try {
                const res = await fetch('http://localhost:3000/theatre');
                const data = await res.json();
                setTheatres(data);
                console.log(data);
            } catch (err) {
                console.error('Failed to fetch theatres:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchTheatres();
    }, []);

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
          <Card key={theatre.id} className='w-[250px] hover:scale-105 transition-all hover:border-amber-500'>
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