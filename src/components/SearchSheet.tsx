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
import ScreeningCard from "./ScreeningCard";

function SearchSheet() {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTheatreId, setSelectedTheatreId] = useState<string | null>(
    null
  );
  const { movies, theatres, screenings, loading, refreshData } = useAppData();

  const filteredScreenings = screenings.filter((screening) => {
    const screeningDate = new Date(screening.startTime)
      .toISOString()
      .slice(0, 10); // "YYYY-MM-DD"
    const matchesMovie =
      !selectedMovieId || screening.movieId === selectedMovieId;
    const matchesDate = !selectedDate || screeningDate === selectedDate;
    const matchesTheatre =
      !selectedTheatreId || screening.theatreId === selectedTheatreId;

    return matchesMovie && matchesDate && matchesTheatre;
  });

  const groupedByTheatre = filteredScreenings.reduce(
    (acc, screening) => {
      const theatreGroup = acc[screening.theatreId] ?? {
        theatreName: screening.theatreName,
        movies: {},
      };

      const movieGroup = theatreGroup.movies[screening.movieId] ?? {
        movieTitle: screening.movieTitle,
        screenings: [],
      };

      movieGroup.screenings.push(screening);
      theatreGroup.movies[screening.movieId] = movieGroup;
      acc[screening.theatreId] = theatreGroup;

      return acc;
    },
    {} as {
      [theatreId: string]: {
        theatreName: string;
        movies: {
          [movieId: string]: {
            movieTitle: string;
            screenings: typeof screenings;
          };
        };
      };
    }
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex gap-2 items-center hover:text-blue-500 cursor-pointer">
          <IoSearchOutline /> Find Tickets
        </div>
      </SheetTrigger>
      <SheetContent className="bg-gradient-to-b from-black via-[#071a55] to-black border-none w-screen">
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
        <div className="flex flex-col gap-5">
          {Object.entries(groupedByTheatre).map(([theatreId, theatre]) => (
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" key={theatreId}>
                  <AccordionTrigger>{theatre.theatreName}</AccordionTrigger>
                  <AccordionContent>
                    {Object.entries(theatre.movies).map(([movieId, movie]) => (
                      <div>
                        <div>
                          <MovieBlock movie={movie} />
                        </div>
                        {movie.screenings
                          .sort(
                            (a, b) =>
                              new Date(a.startTime).getTime() -
                              new Date(b.startTime).getTime()
                          )
                          .map((screening) => (
                            <div>
                              <ScreeningCard screening={screening} />
                            </div>
                          ))}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>

        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SearchSheet;
