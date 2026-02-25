import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Star, Pencil } from "lucide-react";
import type { Movie } from "@/data/movies";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface HeroSectionProps {
  movie: Movie;
}

const HeroSection = ({ movie }: HeroSectionProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const requireAuth = () => {
    if (!user) {
      toast.error("Faça login para interagir");
      navigate("/auth");
      return true;
    }
    return false;
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <img src={movie.backdrop_url} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-end pb-16">
        <div className="flex gap-8 items-end max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="hidden sm:block flex-shrink-0">
            <Link to={`/film/${movie.id}`}>
              <img src={movie.poster_url} alt={movie.title} className="w-40 lg:w-48 rounded-lg poster-shadow hover:scale-105 transition-transform duration-300" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs font-semibold">Em destaque</span>
              <span>{movie.release_year}</span>
              <span>·</span>
              <span>{movie.director}</span>
            </div>

            <Link to={`/film/${movie.id}`}>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground hover:text-primary transition-colors">{movie.title}</h1>
            </Link>

            <p className="text-muted-foreground text-sm lg:text-base max-w-lg line-clamp-3">{movie.overview}</p>

            <div className="flex items-center gap-4 pt-2">
              <Link
                to={`/film/${movie.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Eye className="w-4 h-4" /> Ver detalhes
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
