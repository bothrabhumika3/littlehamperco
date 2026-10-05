import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  showText?: boolean;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  showText = true,
  reviews,
  size = 'sm',
}) => {
  const iconSize = size === 'lg' ? 'w-4 h-4' : size === 'md' ? 'w-3.5 h-3.5' : 'w-3 h-3';

  return (
    <div className="flex items-center gap-1">
      <div className="flex text-gold-500 items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating)
                ? 'fill-gold-400 text-gold-400'
                : 'fill-stone-200 text-stone-200'
            }`}
          />
        ))}
      </div>
      {showText && (
        <span className="text-[11px] font-semibold text-stone-600 ml-0.5">
          {rating.toFixed(1)}
          {reviews !== undefined && <span className="text-stone-400 font-normal"> ({reviews})</span>}
        </span>
      )}
    </div>
  );
};
