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
  refreshUser: () => void;
  isLoading: boolean;
}

export interface AppDataContextType {
  movies: Movie[];
  theatres: Theatre[];
  screenings: ScreeningNormalized[];
  dates: Date[];
  loading: boolean;
  refreshData: () => void;
}

export interface LoginContextType {
  openLoginModal: () => void;
  isLoggedIn: () => boolean;
}

export interface FilterContextType {
  selectedMovie: Movie | null;
  selectedDate: Date | null;
  selectedTheatre: Theatre | null;
  setSelectedMovie: (movie: Movie | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTheatre: (theatre: Theatre | null) => void;
  isOpen: boolean;
  openWithMovie: (movie: Movie) => void;
  openWithTheatre: (theatre: Theatre) => void;
  toggle: (newState: boolean) => void;
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
  posterUrl: string;
};

export type Ticket = {
  id: string;
  userId: string;
  seatId: string;
  screeningId: string;
  purchasedAt: Date;
  refunded: boolean;
};

export type TicketData = {
  id: string;
  seat: SeatData;
  screening: ScreeningData;
  purchasedAt: Date;
  refunded: boolean;
};

export type ScreeningData = {
  movie: MovieData;
  auditorium: AuditoriumData;
  startTime: Date;
};

export type SeatData = {
  auditorium: AuditoriumData;
  row: Row;
  number: number;
};

export type AuditoriumData = {
  number: number;
  type: AuditoriumType;
  theatre: TheatreData;
};

export type TheatreData = {
  name: string;
  location: string;
};

export type MovieData = {
  title: string;
  description: string;
  tags: string[];
  duration: number;
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
  theatre: Theatre;
  auditorium: Auditorium;
  startTime: Date;
};

export type Theatre = {
  id: string;
  name: string;
  location: string;
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
  | "REGULAR"
  | "CC"
  | "DBOX"
  | "SCREENX"
  | "DOLBY_ATMOS"
  | "DOLBY_3D"
  | "LASERPROJECTION";

export const ALL_AUDITORIUM_TYPES: AuditoriumType[] = [
  "IMAX",
  "REGULAR",
  "CC",
  "DBOX",
  "SCREENX",
  "DOLBY_ATMOS",
  "DOLBY_3D",
  "LASERPROJECTION",
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
