'use client'

import { FilterContextType, Movie, Theatre } from '@/lib/types';
import React, { createContext, useContext, useState } from 'react'

const FilterContext = createContext<FilterContextType | null>(null);

const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilter must be used within a FilterProvider');
  return context;
}

function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  function openWithMovie(movie: Movie) {
    setSelectedMovie(movie);
    setIsOpen(true);
  }

  function openWithTheatre(theatre: Theatre) {
    setSelectedTheatre(theatre);
    setIsOpen(true);
  }

  function toggle(newState: boolean) {
    setIsOpen(newState);
    if(!newState) {
      setSelectedMovie(null);
      setSelectedDate(new Date());
      setSelectedTheatre(null);
    }
  }

  return (
    <FilterContext.Provider value={{ isOpen, openWithMovie, openWithTheatre, toggle, selectedMovie, selectedDate, selectedTheatre, setSelectedMovie, setSelectedDate, setSelectedTheatre }}>
      {children}
    </FilterContext.Provider>
  )
}

export { FilterProvider, useFilter }