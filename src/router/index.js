import {createRouter, createWebHistory} from 'vue-router'
import {useAuth} from '@/stores/useAuth.js'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/Register.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/',
            name: 'offers',
            component: () => import('@/views/OffersView.vue'),
            meta: {requiresAuth: true}
        },
                {
            path: '/add_offer',
            name: 'addOffer',
            component: () => import('@/views/NewOffer.vue'),
            meta: {requiresAuth: true}
        },

    ]
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuth();

    if (to.meta.requiresAuth && !auth.isLogin) {
        next({name: 'login'});
    } else {
        next();
    }
});

export default router
