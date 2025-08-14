import React from 'react';


const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-5/6 flex justify-center my-6">
      <div className="flex items-center bg-white/80 backdrop-blur-md rounded-full shadow-lg px-4 py-2 w-full max-w-md">
        <img
          src="/search.svg"
          alt="Search Icon"
          className="w-6 h-6 opacity-60"
        />
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-3 w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default Search;