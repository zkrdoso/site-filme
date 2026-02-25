import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Movie } from "@/data/movies";
import StarRating from "./StarRating";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/film/${movie.id}`} className="group block">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden poster-shadow bg-cinema-card">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <StarRating rating={movie.rating} size="sm" />
            <p className="text-xs text-muted-foreground mt-1">{movie.release_year}</p>
          </div>
          {/* Green border on hover */}
          <div className="absolute inset-0 rounded-lg border-2 border-primary/0 group-hover:border-primary/60 transition-colors duration-300 pointer-events-none" />
        </div>
        <h3 className="mt-2 text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
