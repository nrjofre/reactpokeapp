import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function PokeGrid() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [favorites, setFavorites] = useState(new Set(JSON.parse(localStorage.getItem('favorites')) || []));
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=493');
      const data = await response.json();
      setPokemon(data.results);
      setFilteredPokemon(data.results);
      setIsLoading(false);
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
    const filtered = pokemon.filter(p => p.name.toLowerCase().includes(value));
    setFilteredPokemon(showFavorites ? filtered.filter(p => favorites.has(p.name)) : filtered);
    setCurrentPage(1);
  };

  const handleFavoriteToggle = (name) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(name)) {
        updatedFavorites.delete(name);
      } else {
        updatedFavorites.add(name);
      }
      return updatedFavorites;
    });
  };

  const handleShowFavoritesToggle = () => {
    setShowFavorites(prevShowFavorites => !prevShowFavorites);
    if (!showFavorites) {
      setFilteredPokemon(pokemon.filter(p => favorites.has(p.name)));
    } else {
      setFilteredPokemon(pokemon.filter(p => p.name.toLowerCase().includes(filter)));
    }
    setCurrentPage(1);
  };

  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Filter by name"
        />
        <button
          onClick={handleShowFavoritesToggle}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedPokemon.map(p => (
          <div key={p.name} className="relative p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex flex-col items-center space-y-2">
            <Link to={`/pokedex/${pokemon.findIndex(poke => poke.name === p.name) + 1}`} className="w-full h-full flex flex-col items-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.findIndex(poke => poke.name === p.name) + 1}.png`}
                alt={p.name}
                className="w-24 h-24 mb-2"
              />
              <span className="text-xl font-bold capitalize mb-2 text-gray-800 dark:text-gray-200">{p.name}</span>
            </Link>
            <div className="absolute top-2 right-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteToggle(p.name);
                }}
                className={`p-1 rounded-full ${favorites.has(p.name) ? 'text-yellow-500' : 'text-gray-500'}`}
              >
                <FaStar className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center mt-4 gap-1">
        {Array.from({ length: Math.ceil(filteredPokemon.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'} rounded`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PokeGrid;
