import { movies } from "@/lib/data";
import React from "react";
import MovieCard from "./MovieCard";

function MovieSection() {
    return (
        <section className="flex flex-col gap-6 mt-6">
            <div id="movie-section-header">
                <h2 className="text-4xl font-bold">Movies</h2>
            </div>
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