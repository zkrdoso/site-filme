import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const StarRating = ({ rating, maxRating = 5, size = "md", interactive = false, onRate }: StarRatingProps) => {
  const stars = [];
  const iconSize = sizeMap[size];

  for (let i = 1; i <= maxRating; i++) {
    const filled = rating >= i;
    const half = !filled && rating >= i - 0.5;

    stars.push(
      <button
        key={i}
        type="button"
        disabled={!interactive}
        onClick={() => onRate?.(i)}
        className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
      >
        {filled ? (
          <Star className={`${iconSize} fill-star text-star`} />
        ) : half ? (
          <StarHalf className={`${iconSize} fill-star text-star`} />
        ) : (
          <Star className={`${iconSize} text-muted-foreground/30`} />
        )}
      </button>
    );
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
};

export default StarRating;
