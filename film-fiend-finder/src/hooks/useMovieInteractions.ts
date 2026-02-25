import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export const useMovieInteractions = (movieId: number) => {
  const { user } = useAuth();
  const [watched, setWatched] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const fetch = async () => {
      const [w, f] = await Promise.all([
        supabase.from("watched_movies").select("movie_id").eq("user_id", user.id).eq("movie_id", movieId).maybeSingle(),
        supabase.from("favorites").select("movie_id").eq("user_id", user.id).eq("movie_id", movieId).maybeSingle(),
      ]);
      setWatched(!!w.data);
      setFavorited(!!f.data);
      setLoading(false);
    };
    fetch();
  }, [user, movieId]);

  const toggleWatched = async () => {
    if (!user) { toast.error("Faça login primeiro"); return; }
    if (watched) {
      await supabase.from("watched_movies").delete().eq("user_id", user.id).eq("movie_id", movieId);
      setWatched(false);
      toast.success("Removido dos assistidos");
    } else {
      await supabase.from("watched_movies").insert({ user_id: user.id, movie_id: movieId });
      setWatched(true);
      toast.success("Marcado como assistido!");
    }
  };

  const toggleFavorite = async () => {
    if (!user) { toast.error("Faça login primeiro"); return; }
    if (favorited) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("movie_id", movieId);
      setFavorited(false);
      toast.success("Removido dos favoritos");
    } else {
      await supabase.from("favorites").insert({ user_id: user.id, movie_id: movieId });
      setFavorited(true);
      toast.success("Adicionado aos favoritos!");
    }
  };

  return { watched, favorited, loading, toggleWatched, toggleFavorite };
};
