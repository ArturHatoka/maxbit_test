import { defineStore } from 'pinia'
export const useCocktailStore = defineStore('main', {
    state: () => ({
        cocktailUrl: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        cocktailCodes: ['margarita', 'mojito', 'a1', 'kir'],
        cocktails: {}
    }),
    getters: {
        getCocktail: (state) => (cocktailCode) => state.cocktails[cocktailCode],
        getCocktailCodes: (state) => state.cocktailCodes,
    },
    actions: {
        async fetchCocktail(cocktailCode) {
            if (!this.cocktails[cocktailCode]) {
                const response = await fetch(`${this.cocktailUrl}${cocktailCode}`)
                const data = await response.json()
                this.cocktails[cocktailCode] = data.drinks[0]
            }
        },
    }
})