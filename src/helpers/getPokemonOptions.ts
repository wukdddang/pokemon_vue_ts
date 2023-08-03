import pokemonApi from '../api/pokemonApi';
import { Pokemon } from '../interfaces/pokemon';

import { POKEMON_NUMS_TO_FETCH, MAXIMUM_POKEMON_NUMS } from '../constants/constants';

const getPokemonsId = () => {
  const pokemonsArr = Array.from(Array(MAXIMUM_POKEMON_NUMS));
  return pokemonsArr.map((_, idx) => idx + 1);
}

const getPokemonNames = async ( pokemons: number[] ): Promise<Pokemon[]> => {
  if ( pokemons.length !== POKEMON_NUMS_TO_FETCH ) throw new Error(`${ POKEMON_NUMS_TO_FETCH }마리의 포켓몬을 가져와야 합니다.`);

  const [ a, b, c, d, e ] = pokemons;

  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
    pokemonApi.get(`/${e}`),
  ]

  const [ p1, p2, p3, p4, p5 ] = await Promise.all(promiseArr);

  return [
    { name: p1.data.names[2].name, id: p1.data.id },
    { name: p2.data.names[2].name, id: p2.data.id },
    { name: p3.data.names[2].name, id: p3.data.id },
    { name: p4.data.names[2].name, id: p4.data.id },
    { name: p5.data.names[2].name, id: p5.data.id },
  ]
}

const getPokemonOptions = async () => {
  const mixedPokemon = getPokemonsId().sort(() => Math.random() - 0.5)
  const pokemons = await getPokemonNames(mixedPokemon.splice(0, POKEMON_NUMS_TO_FETCH));
  return pokemons;
}

export default getPokemonOptions;


