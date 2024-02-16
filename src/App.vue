<template>
  <section class="container">
    <router-view/>
  </section>
</template>
<script setup>
import {RouterView} from 'vue-router';
</script>
<style lang="sass">
#app
  display: flex
  justify-content: center

.container
  width: 100%
  max-width: 1024px
</style>