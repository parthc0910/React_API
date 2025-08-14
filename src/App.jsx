import React, { useEffect, useState } from 'react';
import Search from './components/Search.jsx';
import './index.css';
import MovieDetails from './components/MovieDetails.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); // NEW: selected movie state

  const fetchMovies = async () => {
    try {
      const endpoint = searchTerm
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMovies(data.results || []);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">

        <section
          className="bg-fixed bg-cover bg-center min-h-screen"
          style={{ backgroundImage: `url('/background.png')` }}
        >
          <div className="relative flex flex-col items-center justify-center py-12 text-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">Find Movies</h1>
            <div className="search-container flex items-center justify-center w-2/3 bg-white/80 px-4 rounded-lg shadow-lg mb-8">
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
          </div>

          <section className="all-movies bg-transparent max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-center text-5xl md:text-3xl font-bold text-white mb-6">Trending Movies</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {movies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => setSelectedMovie(movie)} // NEW: set selected movie on click
                    className="movie-card bg-gray-400 border-gray-700 border-3 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                          : 'https://via.placeholder.com/300x450?text=No+Poster'
                      }
                      alt={movie.title}
                      className="w-full h-64 object-cover text-center"
                    />
                    <h3 className="font-semibold text-gray-800 p-3 text-2xl text-center truncate">{movie.title}</h3>
                  </div>
                ))}
              </div>
            ) : (
              !errorMessage && <p className="text-gray-500 text-center">No movies found.</p>
            )}
          </section>
        </section>
      </div>

      {/* NEW: Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
};

export default App;