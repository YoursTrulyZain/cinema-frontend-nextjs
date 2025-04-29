"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/lib/types";
import SectionHeader from "./SectionHeader";
import { Skeleton } from "./ui/skeleton";

function MovieSection() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
              const res = await fetch('http://localhost:3000/movie'); // 🔁 Update if deployed
              const data = await res.json();
              setMovies(data);
              console.log(data);
            } catch (err) {
              console.error('Failed to fetch movies:', err);
            } finally {
              setLoading(false);
            }
          };
      
          fetchMovies();
    }, []);

    if (loading) {
      return (
        <section className="flex flex-col gap-6 mt-15">
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
        <section className="flex flex-col gap-6 mt-15">
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