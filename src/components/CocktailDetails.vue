<template>
  <div v-if="cocktail" class="cocktail">
    <div class="cocktail__info">
      <div class="cocktail__desc">
        <h2>{{ cocktail.strDrink }}</h2>
        <p>Категория: {{ cocktail.strCategory }}</p>
        <p>Тип: {{ cocktail.strAlcoholic }}</p>
        <p>Стакан: {{ cocktail.strGlass }}</p>
        <p>Инструкции: {{ cocktail.strInstructions }}</p>

      </div>
      <div class="cocktail__img">
        <img class="img" :src="cocktail.strDrinkThumb" alt="Изображение коктейля" />
      </div>
    </div>
    <div class="cocktail__ingredients">
      <h3>Ингредиенты:</h3>
      <ul>
        <li v-for="ingredient in ingredients" :key="ingredient.name">
          {{ ingredient.name }} {{ ingredient.measure }}
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="loading">
    <p>Загрузка...</p>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCocktailStore } from '../store/cocktails'

const route = useRoute()
const store = useCocktailStore()
const cocktailCode = ref(route.params.cocktail)

watch(() => route.params.cocktail, (newCocktailCode)=>{
  cocktailCode.value = newCocktailCode
  store.fetchCocktail(cocktailCode.value)
})
onBeforeMount(()=>{
  store.fetchCocktail(cocktailCode.value)
})

const cocktail = computed(() => store.getCocktail(cocktailCode.value))
const ingredients = computed(() => {
  if (!cocktail.value) return []
  return Object.keys(cocktail.value)
      .filter((key) => key.startsWith('strIngredient') && cocktail.value[key])
      .map((ingredientKey) => {
        const measureKey = `strMeasure${ingredientKey.slice('strIngredient'.length)}`
        return {
          name: (cocktail.value[ingredientKey] + `${cocktail.value[measureKey] ? '-' : ''}`),
          measure: cocktail.value[measureKey] || ''
        }
      })
})
</script>

<style lang="sass" scoped>
.cocktail, .loading
  width: 75%
  @media screen and (max-width: 760px)
    width: 100%

  &__info
    display: flex
    justify-content: space-between
    @media screen and (max-width: 760px)
      flex-direction: column-reverse

  &__desc
    width: 50%
    @media screen and (max-width: 760px)
      width: 100%

  &__img
    width: 40%
    height: auto
    @media screen and (max-width: 760px)
      width: 100%

img
  width: 100%
  height: 100%
  object-fit: contain
</style>
