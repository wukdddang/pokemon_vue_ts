import { defineComponent, ref } from 'vue'
import PokemonOptions from '../components/PokemonOptions.vue'
import PokemonPicture from '../components/PokemonPicture.vue'

import getPokemonOptions from '../helpers/getPokemonOptions'
import { Pokemon } from '../interfaces/pokemon'

export default defineComponent({
  name: 'PokemonPage',
  components: {
    PokemonOptions,
    PokemonPicture,
  },
  setup: () => {
    const pokemonArr = ref<Pokemon[]>([])
    const pokemon = ref<Pokemon>()
    const showPokemon = ref(false)
    const showAnswer = ref(false)
    const message = ref('');

    let retryCount = 0;
    const mixPokemonArray = async () => {
      try {
        pokemonArr.value = await getPokemonOptions()
      } catch (error) {
        if (retryCount < 3) {
          retryCount++;
          mixPokemonArray()
        }
        return;
      }
      retryCount = 0;
      const randomInt = Math.floor(Math.random() * 4)
      pokemon.value = pokemonArr.value[randomInt]
    }

    const checkAnswer = (selectedId: number) => {
      if (!pokemon.value) return;

      showPokemon.value = true
      showAnswer.value = true

      if (selectedId === pokemon.value.id) {
        message.value = `맞았습니다! ${pokemon.value.name}입니다.`
      } else {
        message.value = `틀렸습니다! 정답은 ${pokemon.value.name}입니다.`
      }
    }

    const newGame = () => {
      showPokemon.value = false
      showAnswer.value = false
      pokemonArr.value = [];
      pokemon.value = undefined;
      mixPokemonArray()
    }

    mixPokemonArray();

    return {
      pokemonArr,
      pokemon,
      showPokemon,
      showAnswer,
      message,
      mixPokemonArray,
      checkAnswer,
      newGame,
    }
  }
})
