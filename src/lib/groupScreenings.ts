// import { GroupedScreenings, Theatre } from "./types";

// export function groupTheatreScreenings(theatre: Theatre): GroupedScreenings {
//   const result: GroupedScreenings = {};

//   for (const auditorium of theatre.auditoriums) {
//     for (const screening of auditorium.screenings) {
//       const movieId = screening.movieId;
//       const type = auditorium.type;

//       if (!result[movieId]) {
//         result[movieId] = { movieId, screeningsByType: {} };
//       }

//       if (!result[movieId].screeningsByType[type]) {
//         result[movieId].screeningsByType[type] = [];
//       }

//       result[movieId].screeningsByType[type].push({
//         ...screening,
//         auditoriumId: auditorium.id,
//         auditoriumNumber: auditorium.number,
//         auditoriumType: type,
//       });
//     }
//   }

//   for (const movie of Object.values(result)) {
//     for (const type in movie.screeningsByType) {
//       movie.screeningsByType[type].sort(
//         (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
//       );
//     }
//   }

//   return result;
// }
