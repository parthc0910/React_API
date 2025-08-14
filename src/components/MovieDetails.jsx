import React, { useEffect, useState } from 'react';
import './MovieDetails.css';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = ({ movie, onClose }) => {
  const [extraDetails, setExtraDetails] = useState(null);

  useEffect(() => {
    const fetchExtraDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/movie/${movie.id}`, API_OPTIONS);
        if (!response.ok) throw new Error('Failed to fetch details');
        const data = await response.json();
        setExtraDetails(data);
      } catch (error) {
        console.error('Error fetching extra details:', error);
      }
    };
    fetchExtraDetails();
  }, [movie.id]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="movie-details">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Poster'
            }
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-info">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-release">
              <strong>Release Date:</strong> {movie.release_date || 'N/A'}
            </p>
            <p className="movie-rating">
              <strong>Rating:</strong> {movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : 'N/A'} 
              {movie.vote_count ? ` (${movie.vote_count} votes)` : ''}
            </p>
            {extraDetails && (
              <>
                <p className="movie-genres">
                  <strong>Genres:</strong>{' '}
                  {extraDetails.genres.map((g) => g.name).join(', ') || 'N/A'}
                </p>
                <p className="movie-runtime">
                  <strong>Runtime:</strong> {extraDetails.runtime ? `${extraDetails.runtime} minutes` : 'N/A'}
                </p>
              </>
            )}
            <p className="movie-overview">
              <strong>Overview:</strong> {movie.overview || 'No overview available.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;