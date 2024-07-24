import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const typeColors = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-500',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-orange-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-700',
  rock: 'bg-gray-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

function Pokedex() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemonData = await pokemonResponse.json();
      const speciesResponse = await fetch(pokemonData.species.url);
      const speciesData = await speciesResponse.json();

      setPokemon({
        id: pokemonData.id,
        name: pokemonData.name,
        types: pokemonData.types.map(t => t.type.name),
        image: pokemonData.sprites.other['official-artwork'].front_default,
        weight: pokemonData.weight,
        height: pokemonData.height,
        description: speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text
          .replace(/\n/g, ' ')
          .replace(/\f/g, ' '),
        audioUrl: pokemonData.cries.latest,
      });
      setIsLoading(false);
    };

    fetchPokemonData();
  }, [id]);

  useEffect(() => {
    if (pokemon) {
      const audio = new Audio(pokemon.audioUrl);
      audio.volume = 0.03;
      audio.play();
    }
  }, [pokemon]);

  if (isLoading) {
    return (
      <div className="p-4 dark:bg-gray-900 flex justify-center items-center h-64">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 dark:bg-gray-900">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-800 dark:bg-gray-900 text-white p-4 flex items-center">
          <Link to="/pokegrid" className="mr-4">
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
        </div>
        <div className="w-full h-64 overflow-hidden flex justify-center items-center bg-gray-100 dark:bg-gray-700">
          <img src={pokemon.image} alt={pokemon.name} className="h-full object-contain" />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700 dark:text-gray-300 font-bold">#{pokemon.id}</span>
            <div className="flex space-x-2">
              {pokemon.types.map(type => (
                <span key={type} className={`px-2 py-1 rounded capitalize text-sm font-bold ${typeColors[type]}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{pokemon.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300 font-bold">Height: {pokemon.height / 10} m</span>
            <span className="text-gray-700 dark:text-gray-300 font-bold">Weight: {pokemon.weight / 10} kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokedex; 
