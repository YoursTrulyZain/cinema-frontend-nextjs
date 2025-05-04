import { Movie, ScreeningNormalized, Theatre } from "./types";

function mapDataToScreenings(
  theatres: Theatre[],
  movies: Movie[]
): ScreeningNormalized[] {
  const movieMap = new Map(movies.map((movie) => [movie.id, movie]));
  const screenings: ScreeningNormalized[] = [];

  for (const theatre of theatres) {
    for (const auditorium of theatre.auditoriums) {
      for (const screening of auditorium.screenings) {
        const movie = movieMap.get(screening.movieId);

        if (!movie) {
          throw new Error(`Movie with id ${screening.movieId} not found`);
        }

        screenings.push({
          id: screening.id,
          startTime: screening.startTime,
          movie,
          theatre,
          auditorium,
        });
      }
    }
  }
  return screenings.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
}

export default mapDataToScreenings;
