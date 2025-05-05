'use client';

import React, { useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import MovieSheet from "./MovieSheet";
import TheatreSheet from "./TheatreSheet";
import DateSheet from "./DateSheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Separator } from "./ui/separator";
import { useAppData } from "@/contexts/AppDataContext";
import MovieBlock from "./MovieBlock";
import AuditoriumCard from "./AuditoriumCard";
import { useFilter } from "@/contexts/FilterContext";
import { Auditorium, AuditoriumType, Movie, ScreeningNormalized, Theatre } from "@/lib/types";
import TicketPurchaseFlow from "./TicketPurchaseFlow";

function SearchSheet() {
  const { selectedMovie, selectedDate, selectedTheatre, isOpen, toggle } = useFilter();
  const { movies, theatres, screenings, loading, refreshData } = useAppData();

  const filteredScreenings = screenings.filter((screening) => {
    // const screeningDate = new Date(screening.startTime).getDate();
    const screeningDate = null
    const matchesMovie =
      !selectedMovie || screening.movie.id === selectedMovie.id;
    const matchesDate = !selectedDate || screeningDate === selectedDate.getDate();
    const matchesTheatre =
      !selectedTheatre || screening.theatre.id === selectedTheatre.id;

    return matchesMovie && matchesDate && matchesTheatre;
  });

  const groupedByTheatre = filteredScreenings.reduce(
    (acc, screening) => {
      const theatreGroup = acc[screening.theatre.id] ?? {
        theatre: screening.theatre,
        movies: {},
      };

      const movieGroup = theatreGroup.movies[screening.movie.id] ?? {
        movie: screening.movie,
        auditoriums: {},
      };

      const auditoriumGroup = movieGroup.auditoriums[screening.auditorium.type] ?? {
        auditorium: screening.auditorium,
        screenings: [],
      };

      auditoriumGroup.screenings.push(screening);
      movieGroup.auditoriums[screening.auditorium.type] = auditoriumGroup;
      theatreGroup.movies[screening.movie.id] = movieGroup;
      acc[screening.theatre.id] = theatreGroup;

      return acc;
    },
    {} as {
      [theatreId: string]: {
        theatre: Theatre;
        movies: {
          [movieId: string]: {
            movie: Movie;
            auditoriums: Record<AuditoriumType, {
              auditorium: Auditorium;
              screenings: ScreeningNormalized[];
            }>;
          };
        };
      };
    }
  );

  return (
    <Sheet open={isOpen} onOpenChange={toggle}>
      <SheetTrigger asChild>
        <div className="flex gap-2 items-center hover:text-blue-500 cursor-pointer">
          <IoSearchOutline /> Find Tickets
        </div>
      </SheetTrigger>
      <SheetContent className="bg-gradient-to-b from-black via-[#071a55] to-black border-none w-screen overflow-y-auto max-h-screen">
        <SheetHeader className="hidden">
          <SheetTitle>Tickets</SheetTitle>
          <SheetDescription>
            Select a movie, date, and theatre to see showtimes
          </SheetDescription>
        </SheetHeader>
        <div className="text-5xl mx-15 my-10">Tickets</div>
        <div className="flex flex-col gap-5 lg:flex-row">
          <MovieSheet />
          <DateSheet />
          <TheatreSheet />
        </div>
        <Separator className="my-5 bg-white " />
        <TicketPurchaseFlow groupedByTheatre={groupedByTheatre} />
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SearchSheet;
