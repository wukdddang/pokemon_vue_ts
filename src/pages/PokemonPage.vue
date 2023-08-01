<script src="./PokemonPage.ts" />
<template>
  <h1 v-if="!pokemon">기다려주세요...</h1>
  <div v-else>
    <h1>이 포켓몬은 무엇일까요?</h1>
    <PokemonPicture
      :pokemonId="pokemon.id"
      :showPokemon="showPokemon"
    />
    <PokemonOptions
      :pokemons="pokemonArr"
      @selection-pokemon="checkAnswer"
    />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">
        새로운 게임
      </button>
    </template>
  </div>
</template>