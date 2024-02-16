import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import NotFound from "../views/NotFound.vue";
import Cocktail from "../views/Cocktail.vue";
import {useCocktailStore} from "../store/cocktails.js";

const pinia = createPinia()
setActivePinia(pinia)

const store = useCocktailStore()
const routes = [
    {
        path: '/',
        redirect:  () => `/${store.getCocktailCodes[0]}`
    },
    {
        path: '/:cocktail',
        name: 'CocktailDetails',
        component: Cocktail,
        props: true
    },
    {
        path: '/404',
        name: 'NotFound',
        component: NotFound,
        meta: {
            isErrorPage: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (store.getCocktailCodes.includes(to.params.cocktail)|| to.meta.isErrorPage) {
        next();
    } else {
        next({ name: 'NotFound' })
    }
});

export default router