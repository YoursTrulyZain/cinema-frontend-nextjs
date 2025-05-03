export type GroupedScreenings = {
  [movieId: string]: {
    movieId: string;
    screeningsByType: {
      [auditoriumType: string]: Screening[]; // Sorted by time
    };
  };
};

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

export interface AppDataContextType {
  movies: Movie[];
  theatres: Theatre[];
  screenings: ScreeningNormalized[];
  loading: boolean;
  refreshData: () => void;
}

export interface LoginContextType {
  openLoginModal: () => void;
  isLoggedIn: () => boolean;
}

export type User = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  isAdmin: boolean;
  tickets: Ticket[];
  createdAt: Date;
};

export type Movie = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration: number;
  screenings: Screening[];
};

export type Ticket = {
  id: string;
  userId: string;
  seatId: string;
  screeningId: string;
  purchasedAt: Date;
  refunded: boolean;
};

export type Seat = {
  id: string;
  auditoriumId: string;
  row: Row;
  number: number;
  tickets: Ticket[];
};

export type Screening = {
  id: string;
  movieId: string;
  auditoriumId: string;
  startTime: Date;
  tickets: Ticket[];
};

export type ScreeningNormalized = {
  id: string;
  movie: Movie;
  theatreId: string;
  theatreName: string;
  auditoriumId: string;
  auditoriumNumber: number;
  auditoriumType: string;
  startTime: Date;
};

export type Theatre = {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  auditoriums: Auditorium[];
};

export type Auditorium = {
  id: string;
  number: number;
  type: AuditoriumType;
  theatreId: string;
  seats: Seat[];
  screenings: Screening[];
};

export type AuditoriumType =
  | "IMAX"
  | "STANDARD"
  | "CC"
  | "DBOX"
  | "SCREENX"
  | "DOLBY_ATMOS"
  | "DOLBY_3D";

export const ALL_AUDITORIUM_TYPES: AuditoriumType[] = [
  "IMAX",
  "STANDARD",
  "CC",
  "DBOX",
  "SCREENX",
  "DOLBY_ATMOS",
  "DOLBY_3D",
];

export type Row =
  | "AA"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M";

export const ALL_ROWS: Row[] = [
  "AA",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
];
