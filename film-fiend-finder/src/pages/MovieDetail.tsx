import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, Heart, Calendar, Clapperboard, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import ReviewDialog from "@/components/ReviewDialog";
import { MOCK_MOVIES } from "@/data/movies";
import { useMovieInteractions } from "@/hooks/useMovieInteractions";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const MovieDetail = () => {
  const { id } = useParams();
  const movieId = Number(id);
  const movie = MOCK_MOVIES.find((m) => m.id === movieId);
  const { user } = useAuth();
  const { watched, favorited, toggleWatched, toggleFavorite } = useMovieInteractions(movieId);
  const [reviews, setReviews] = useState<any[]>([]);

  const loadReviews = useCallback(async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("movie_id", movieId)
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
  }, [movieId]);

  useEffect(() => { loadReviews(); }, [loadReviews]);

  // Load profile names for reviews
  const [profileNames, setProfileNames] = useState<Record<string, string>>({});
  useEffect(() => {
    if (reviews.length === 0) return;
    const userIds = [...new Set(reviews.map((r) => r.user_id))];
    supabase
      .from("profiles")
      .select("user_id, name")
      .in("user_id", userIds)
      .then(({ data }) => {
        const map: Record<string, string> = {};
        data?.forEach((p: any) => { map[p.user_id] = p.name; });
        setProfileNames(map);
      });
  }, [reviews]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-serif text-foreground">Filme não encontrado</h1>
          <Link to="/" className="text-primary mt-4 inline-block hover:underline">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={movie.backdrop_url} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      </div>

      <main className="container mx-auto px-4 -mt-40 relative z-10">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-shrink-0">
            <img src={movie.poster_url} alt={movie.title} className="w-56 rounded-lg poster-shadow mx-auto md:mx-0" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex-1 space-y-4">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {movie.release_year}</span>
              <span className="flex items-center gap-1"><Clapperboard className="w-4 h-4" /> {movie.director}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span key={g} className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">{g}</span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <StarRating rating={movie.rating} size="lg" />
              <span className="text-lg font-bold text-foreground">{movie.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({movie.vote_count.toLocaleString()} votos)</span>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-2xl">{movie.overview}</p>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={toggleWatched}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  watched ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-cinema-hover"
                }`}
              >
                {watched ? <CheckCircle className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {watched ? "Assistido" : "Marcar como assistido"}
              </button>
              <button
                onClick={toggleFavorite}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  favorited ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:bg-cinema-hover"
                }`}
              >
                <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
                {favorited ? "Favoritado" : "Favoritar"}
              </button>
              <ReviewDialog movieId={movie.id} movieTitle={movie.title} onReviewSubmitted={loadReviews} />
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <section className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-1">Resenhas</h2>
          <div className="w-16 h-0.5 bg-primary mt-3 mb-6" />
          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {reviews.map((r: any) => (
                <div key={r.id} className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                      {(profileNames[r.user_id] || "U")[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-foreground">{profileNames[r.user_id] || "Usuário"}</span>
                    <span className="text-xs text-muted-foreground">· {new Date(r.created_at).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <StarRating rating={r.rating} size="sm" />
                  {r.review_text && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {r.has_spoilers ? (
                        <span className="italic text-accent">⚠️ Esta resenha contém spoilers</span>
                      ) : (
                        r.review_text
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm py-8 text-center">Nenhuma resenha ainda. Seja o primeiro a compartilhar sua opinião!</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MovieDetail;
