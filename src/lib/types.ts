export type Movie = {
    id: number;
    title: string;
    image: string;
}

export type Theatre = {
    id: number;
    name: string;
    location: string;
    phone: string;
    email: string;
    auditoriums?: Auditorium[];
}

export type Auditorium = {
    id: number;
    number: number;
    type: AuditoriumType;
    theatreId: number;
    seats: Seat[];
    screenings: Screening[];
}

export type Seat = {
    id: number;
    row: Row;
    number: number;
    auditoriumId: number;
    tickets: Ticket[];
}

export type Screening = {
    id: string;
    movieId: string;
    auditoriumId: string;
    startTime: Date;
    tickets: Ticket[];
}

export type Ticket = {
    id: string;
    userId: string;
    seatId: string;
    screeningId: string;
    purchasedAt: Date;
    refunded: boolean;
}

export type User = {
    id: string;
    email: string;
    name: string;
    password: string;
    phone: string | null;
    isAdmin: boolean;
    tickets: Ticket[];
    createdAt: Date;
}

export type AuditoriumType = 
  | 'IMAX'
  | 'STANDARD'
  | 'CC'
  | 'DBOX'
  | 'SCREENX'
  | 'DOLBY_ATMOS'
  | 'DOLBY_3D';

export const ALL_AUDITORIUM_TYPES: AuditoriumType[] = [
  'IMAX', 'STANDARD', 'CC', 'DBOX', 'SCREENX', 'DOLBY_ATMOS', 'DOLBY_3D',
];

export type Row = 'AA' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M';

export const ALL_ROWS: Row[] = [
  'AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
];