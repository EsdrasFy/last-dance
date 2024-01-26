import React, { useState, useEffect } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

function RatingUi() {
  const [star, setStar] = useState<number>(1);
  const [ratingText, setRatingText] = useState<string>('');

  useEffect(() => {
    setRatingText(getRatingText());
  }, [star]);

  const starMouseOver = (number: number) => {
    setStar(number);
  };

  const getRatingText = () => {
    switch (star) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Very Good';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  };

  return (
    <div className='flex gap-3'>
      <ul className='flex gap-3'>
        {[1, 2, 3, 4, 5].map((number) => (
          <li
            key={number}
            onMouseOver={() => starMouseOver(number)}
            className='text-custom-pink duration-200 ease-linear text-2xl cursor-pointer hover:scale-125'
          >
            {star >= number ? <FaStar /> : <FaRegStar />}
          </li>
        ))}
      </ul>
      <p>{ratingText}</p>
    </div>
  );
}

export default RatingUi;