import { movieGenreMap, tvGenreMap  } from "../Constants/genres";

export function getMovieGenreNames(genreIds: number[]): string[] {
  return genreIds.map(id => movieGenreMap[id]).filter(Boolean);
}

export function getTvGenreNames(genreIds: number[]): string[] {
    return genreIds.map(id => tvGenreMap[id]).filter(Boolean);
  }