import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { MOCK_MOVIES } from "@/data/movies";
import StarRating from "@/components/StarRating";
import { toast } from "sonner";

const MyReviews = () => {
  const { user, loading: authLoading } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("reviews")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setReviews(data || []));
  }, [user]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  const deleteReview = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success("Resenha removida");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-serif font-bold text-foreground mb-1">Minhas Resenhas</h1>
          <div className="w-16 h-0.5 bg-primary mt-2 mb-6" />

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((r: any) => {
                const movie = MOCK_MOVIES.find((m) => m.id === r.movie_id);
                if (!movie) return null;
                return (
                  <div key={r.id} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                    <Link to={`/film/${movie.id}`} className="flex-shrink-0">
                      <img src={movie.poster_url} alt={movie.title} className="w-16 h-24 object-cover rounded-md" />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/film/${movie.id}`}>
                        <h4 className="font-serif font-bold text-foreground text-sm hover:text-primary transition-colors">
                          {movie.title} <span className="font-sans font-normal text-muted-foreground">({movie.release_year})</span>
                        </h4>
                      </Link>
                      <div className="my-1"><StarRating rating={r.rating} size="sm" /></div>
                      {r.review_text && <p className="text-sm text-muted-foreground">{r.review_text}</p>}
                      {r.has_spoilers && (
                        <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full">Spoilers</span>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">{new Date(r.created_at).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <button onClick={() => deleteReview(r.id)} className="self-start text-muted-foreground hover:text-destructive transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-16">Você ainda não escreveu nenhuma resenha.</p>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default MyReviews;
