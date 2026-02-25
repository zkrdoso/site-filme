import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Eye, Heart, Pencil, LogOut } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { MOCK_MOVIES } from "@/data/movies";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Profile = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [watchedIds, setWatchedIds] = useState<number[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [p, w, f, r] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("watched_movies").select("movie_id").eq("user_id", user.id),
        supabase.from("favorites").select("movie_id").eq("user_id", user.id),
        supabase.from("reviews").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      setProfile(p.data);
      setEditName(p.data?.name || "");
      setEditBio(p.data?.bio || "");
      setWatchedIds((w.data || []).map((x: any) => x.movie_id));
      setFavoriteIds((f.data || []).map((x: any) => x.movie_id));
      setReviews(r.data || []);
    };
    load();
  }, [user]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  const watchedMovies = MOCK_MOVIES.filter((m) => watchedIds.includes(m.id));
  const favoriteMovies = MOCK_MOVIES.filter((m) => favoriteIds.includes(m.id));

  const saveProfile = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ name: editName, bio: editBio })
      .eq("user_id", user.id);
    if (error) toast.error("Erro ao salvar");
    else {
      toast.success("Perfil atualizado!");
      setProfile({ ...profile, name: editName, bio: editBio });
      setEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Profile header */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold text-foreground">
              {(profile?.name || "U")[0].toUpperCase()}
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="space-y-3 max-w-md">
                  <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Nome" />
                  <Textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} placeholder="Bio" rows={3} />
                  <div className="flex gap-2">
                    <Button onClick={saveProfile} size="sm" className="rounded-full">Salvar</Button>
                    <Button onClick={() => setEditing(false)} variant="ghost" size="sm">Cancelar</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-serif font-bold text-foreground">{profile?.name}</h1>
                  {profile?.bio && <p className="text-muted-foreground text-sm mt-1">{profile.bio}</p>}
                  <button onClick={() => setEditing(true)} className="text-xs text-primary mt-2 hover:underline flex items-center gap-1">
                    <Pencil className="w-3 h-3" /> Editar perfil
                  </button>
                </>
              )}
              <div className="flex gap-6 mt-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">{watchedIds.length}</p>
                  <p className="text-xs text-muted-foreground">Assistidos</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">{favoriteIds.length}</p>
                  <p className="text-xs text-muted-foreground">Favoritos</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">{reviews.length}</p>
                  <p className="text-xs text-muted-foreground">Resenhas</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={signOut} className="text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" /> Sair
            </Button>
          </div>

          {/* Favorites */}
          {favoriteMovies.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-serif font-bold text-foreground mb-1 flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent" /> Favoritos
              </h2>
              <div className="w-16 h-0.5 bg-primary mt-2 mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {favoriteMovies.slice(0, 4).map((m) => (
                  <Link to={`/film/${m.id}`} key={m.id}>
                    <img src={m.poster_url} alt={m.title} className="rounded-lg poster-shadow w-full aspect-[2/3] object-cover hover:opacity-80 transition-opacity" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Watched */}
          {watchedMovies.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-serif font-bold text-foreground mb-1 flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" /> Assistidos
              </h2>
              <div className="w-16 h-0.5 bg-primary mt-2 mb-4" />
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {watchedMovies.map((m) => (
                  <Link to={`/film/${m.id}`} key={m.id}>
                    <img src={m.poster_url} alt={m.title} className="rounded-lg w-full aspect-[2/3] object-cover hover:opacity-80 transition-opacity" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-1 flex items-center gap-2">
              <Pencil className="w-5 h-5 text-star" /> Minhas Resenhas
            </h2>
            <div className="w-16 h-0.5 bg-primary mt-2 mb-4" />
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
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-8">Você ainda não escreveu nenhuma resenha.</p>
            )}
          </section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
