export type Genre = {
    id: number;
    name: string;
  };
  
  export type Movie = {
    id: number;
    title: string;
    backdrop_path: string;
    overview: string;
    genre_ids: number[];
    // other fields...
  };
  