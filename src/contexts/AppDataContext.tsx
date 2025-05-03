'use client'

import mapDataToScreenings from "@/lib/dataMapper";
import { AppDataContextType, Movie, ScreeningNormalized, Theatre } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const useAppData = () => {
    const context = useContext(AppDataContext);
    if (!context) throw new Error('useAppDataContext must be used within a AppDataProvider');
    return context;
}

function AppDataProvider({ children }: { children: React.ReactNode }) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [theatres, setTheatres] = useState<Theatre[]>([]);
    const [screenings, setScreenings] = useState<ScreeningNormalized[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [movieResponse, theatreResponse] = await Promise.all([
                fetch('http://localhost:3001/movie'),
                fetch('http://localhost:3001/theatre/everything'),
            ]);
            const [moviesData, theatresData] = await Promise.all([movieResponse.json(), theatreResponse.json()]);
            setMovies(moviesData);
            setTheatres(theatresData);
            const flatScreenings = mapDataToScreenings(theatresData, moviesData);
            setScreenings(flatScreenings)
        } catch (error) {
            console.error('Error fetching app data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = () => fetchData();

    return (
        <AppDataContext.Provider value={{ movies, theatres, screenings, loading, refreshData }}>
            {children}
        </AppDataContext.Provider>
    )
}

export { AppDataProvider, useAppData }
