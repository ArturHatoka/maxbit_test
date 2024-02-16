<template>
  <div class="cocktails">
    <CocktailList/>
    <CocktailDetails/>
  </div>
</template>

<script setup>
import CocktailDetails from "../components/CocktailDetails.vue";
import CocktailList from "../components/CocktailList.vue";
</script>

<style lang="sass" scoped>
.cocktails
  display: flex
  width: 100%
  @media screen and (max-width: 760px)
    flex-direction: column
    align-items: center
</style>