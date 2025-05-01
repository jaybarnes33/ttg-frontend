import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size = 20 }: StarRatingProps) => {
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(<MaterialIcons key={i} name="star" size={size} color="#FFEB3B" />);
  }

  return <View className="flex-row">{stars}</View>;
};

export default StarRating;
