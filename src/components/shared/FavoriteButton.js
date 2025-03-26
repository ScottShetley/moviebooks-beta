// src/components/shared/FavoriteButton.js
import React, { useState } from 'react';
import { userService } from '../../services/api';
import './FavoriteButton.css';

function FavoriteButton({ itemId, itemType, isFavorited, userId }) {
  const [favorite, setFavorite] = useState(isFavorited);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async () => {
    try {
      setIsLoading(true);
      
      if (favorite) {
        await userService.removeFromFavorites(userId, itemId, itemType);
      } else {
        await userService.addToFavorites(userId, itemId, itemType);
      }
      
      setFavorite(!favorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Keep UI state unchanged on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`favorite-button ${favorite ? 'favorited' : ''}`}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isLoading ? '...' : favorite ? '★' : '☆'}
    </button>
  );
}

export default FavoriteButton;