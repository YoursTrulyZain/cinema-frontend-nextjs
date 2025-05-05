'use client';

import React from "react";
import MovieCard from "./MovieCard";
import SectionHeader from "./SectionHeader";
import { Skeleton } from "./ui/skeleton";
import { useAppData } from "@/contexts/AppDataContext";

function MovieSection() {
    const { movies, loading } = useAppData();

    if (loading) {
      return (
        <section className="flex flex-col gap-6 mx-13 mt-17">
          <SectionHeader title="Movies" />
          <div id="movie-grid-container" className="flex flex-wrap gap-8">
            <Skeleton className="w-[272px] h-[434px] rounded-none" />
            <Skeleton className="w-[272px] h-[434px] rounded-none" />
            <Skeleton className="w-[272px] h-[434px] rounded-none" />
            <Skeleton className="w-[272px] h-[434px] rounded-none" />
          </div>
        </section>
      )
      }
    return (
        <section className="flex flex-col gap-6 mx-13 mt-17">
            <SectionHeader title="Movies" />
            <div id="movie-grid-container" className="flex flex-wrap gap-8">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    )
}

export default MovieSection;

//272 * 515.15
//272 * 408