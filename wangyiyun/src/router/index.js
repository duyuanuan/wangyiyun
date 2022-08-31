import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const Home = () => import('../views/Home.vue')
const PlayList = () => import('../views/PlayList.vue')
const Search = () => import('../views/Search.vue')
const Login = () => import('../views/Login.vue')
const UserInf = () => import('../views/UserInfo.vue')

const routes = [
    {
        path: '',
        component: Home,
        name: 'Home',
    },
    {
        path: '/playList',
        component: PlayList,
        name: 'PlayList',
    },
    {
        path: '/search',
        component: Search,
        name: 'Search',
    },
    {
        path: '/login',
        component: Login,
        name: 'Login',
    },
    {
        path: '/userInf',
        component: UserInf,
        name: 'UserInf',
        beforeEnter: (to, from, next) => {
            if (store.state.isLogin || store.state.token == '111111' || localStorage.getItem('token') == '111111') {
                next()
            } else {
                next('/login')
            }
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

router.beforeEach((to, from) => {
    if (to.path == '/login') {
        store.state.isMusicFooterShow = false
    } else {
        store.state.isMusicFooterShow = true
    }
})
export default router