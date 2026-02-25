import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import type { Review } from "@/data/movies";
import { MOCK_MOVIES } from "@/data/movies";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const movie = MOCK_MOVIES.find((m) => m.id === review.movie_id);

  return (
    <div className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
      {movie && (
        <Link to={`/film/${movie.id}`} className="flex-shrink-0">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-16 h-24 object-cover rounded-md hover:opacity-80 transition-opacity"
          />
        </Link>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <img
            src={review.user.avatar}
            alt={review.user.name}
            className="w-6 h-6 rounded-full bg-secondary"
          />
          <span className="text-sm font-medium text-foreground">{review.user.name}</span>
          <span className="text-xs text-muted-foreground">· {review.created_at}</span>
        </div>
        {movie && (
          <Link to={`/film/${movie.id}`}>
            <h4 className="font-serif font-bold text-foreground hover:text-primary transition-colors text-sm">
              {movie.title}{" "}
              <span className="text-muted-foreground font-sans font-normal">({movie.release_year})</span>
            </h4>
          </Link>
        )}
        <div className="my-1.5">
          <StarRating rating={review.rating} size="sm" />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{review.review_text}</p>
        {review.has_spoilers && (
          <span className="inline-block mt-1.5 text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full">
            Contém Spoilers
          </span>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
