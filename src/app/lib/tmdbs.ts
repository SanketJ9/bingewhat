import { movieGenreMap  } from "../Constants/genres";

export function getMovieGenreNames(genreIds: number[]): string[] {
  return genreIds.map(id => movieGenreMap[id]).filter(Boolean);
}
