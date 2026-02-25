import type { Movie } from "@/data/movies";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  subtitle?: string;
}

const MovieGrid = ({ movies, title, subtitle }: MovieGridProps) => {
  return (
    <section className="py-8">
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-serif font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
          <div className="w-16 h-0.5 bg-primary mt-3" />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;
