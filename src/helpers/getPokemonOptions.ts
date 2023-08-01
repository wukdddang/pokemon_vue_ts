import pokemonApi from '../api/pokemonApi';
import { Pokemon } from '../interfaces/pokemon';

const getPokemonsId = () => {
  const pokemonsArr = Array.from(Array(650));
  return pokemonsArr.map((_, idx) => idx + 1);
}

const getPokemonNames = async ( pokemons: number[] ): Promise<Pokemon[]> => {
  if ( pokemons.length !== 4 ) throw new Error('Only 4 pokemons are allowed');

  const [ a, b, c, d ] = pokemons;

  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ]

  const [ p1, p2, p3, p4 ] = await Promise.all(promiseArr);

  return [
    { name: p1.data.names[2].name, id: p1.data.id },
    { name: p2.data.names[2].name, id: p2.data.id },
    { name: p3.data.names[2].name, id: p3.data.id },
    { name: p4.data.names[2].name, id: p4.data.id },
  ]
}

const getPokemonOptions = async () => {
  const mixedPokemon = getPokemonsId().sort(() => Math.random() - 0.5)
  const pokemons = await getPokemonNames(mixedPokemon.splice(0, 4));
  return pokemons;
}

export default getPokemonOptions;


