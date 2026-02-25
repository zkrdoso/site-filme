import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil } from "lucide-react";
import StarRating from "./StarRating";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ReviewDialogProps {
  movieId: number;
  movieTitle: string;
  onReviewSubmitted?: () => void;
}

const ReviewDialog = ({ movieId, movieTitle, onReviewSubmitted }: ReviewDialogProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [spoilers, setSpoilers] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user) { toast.error("Faça login primeiro"); return; }
    if (rating === 0) { toast.error("Dê uma nota ao filme"); return; }

    setLoading(true);
    const { error } = await supabase.from("reviews").upsert(
      { user_id: user.id, movie_id: movieId, rating, review_text: text, has_spoilers: spoilers },
      { onConflict: "user_id,movie_id" }
    );

    if (error) {
      toast.error("Erro ao salvar resenha");
    } else {
      toast.success("Resenha salva!");
      setOpen(false);
      setRating(0);
      setText("");
      setSpoilers(false);
      onReviewSubmitted?.();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-cinema-hover transition-colors">
          <Pencil className="w-4 h-4" /> Escrever resenha
        </button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-serif text-foreground">Resenha — {movieTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Sua nota</p>
            <StarRating rating={rating} interactive onRate={setRating} size="lg" />
          </div>
          <Textarea
            placeholder="Escreva sua resenha (opcional)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
          />
          <div className="flex items-center gap-2">
            <Checkbox id="spoilers" checked={spoilers} onCheckedChange={(v) => setSpoilers(!!v)} />
            <label htmlFor="spoilers" className="text-sm text-muted-foreground cursor-pointer">
              Contém spoilers
            </label>
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full rounded-full">
            {loading ? "Salvando..." : "Salvar resenha"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
