<template>
  <div class="cocktailList">
    <h2>Коктейли</h2>
    <ul class="list">
      <li v-for="(code, index) in store.getCocktailCodes" :key="index"
          class="list__elem"
      >
        <router-link :to="`/${code}`">{{ code }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useCocktailStore} from "../store/cocktails.js";
const store = useCocktailStore()
</script>

<style lang="sass" scoped>
.cocktailList
  width: 25%
  @media screen and (max-width: 760px)
    width: 100%
    display: flex
    align-items: center
    flex-direction: column

.list
  list-style-type: none
  padding: 0
  &__elem
    margin-bottom: 10px

.router-link-active
  color: red

</style>