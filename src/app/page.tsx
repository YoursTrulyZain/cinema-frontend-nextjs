import Image from "next/image";
import MovieSection from "../components/MovieSection";
import TheatreSection from "@/components/TheatreSection";

export default function Home() {
  return (
    <div className="flex flex-col px-6 flex-1">
      <MovieSection />
      <TheatreSection />
    </div>
  );
}
