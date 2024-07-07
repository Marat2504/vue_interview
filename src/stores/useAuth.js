import {useToast} from "vue-toastification";
import {ref} from 'vue'
import {defineStore} from 'pinia'
import router from "@/router/index.js";
import axios from "@/api/axios.js";
import registerApi from '@/api/register.js'

export const useAuth = defineStore('auth', () => {
    const toast = useToast()
    let accessToken = ref('')
    let refreshToken = ref('')
    let isLogin = ref(false)

    function initState() {
        if (localStorage.getItem('accessToken')) {
            accessToken.value = localStorage.getItem('accessToken')
            refreshToken.value = localStorage.getItem('refreshToken')
            isLogin.value = JSON.parse(localStorage.getItem('isLoggedIn'))

            return new Promise(() => {
                registerApi.refresh({
                    "refresh": refreshToken.value
                })
                    .then(response => {
                        accessToken.value = response.data.access
                        setTokens()
                    })
                    .catch((e) => {
                        console.log('ошибка при обновлении токена', e)
                        router.push({name: 'login'})
                    })
            })
        }

    }

    function setState(tokens) {
        accessToken.value = tokens.access
        refreshToken.value = tokens.refresh
        isLogin.value = true
        setTokens()
    }

    function removeState() {
        accessToken.value = null
        refreshToken.value = null
        isLogin.value = false
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('isLoggedIn')
        toast.error('Вы вышли из системы', {
            timeout: 3000
          } )
        router.push({name: 'login'})
    }

    function setTokens() {
        localStorage.setItem('accessToken',  accessToken.value)
        localStorage.setItem('refreshToken', refreshToken.value)
        localStorage.setItem('isLoggedIn', 'true')
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken.value
    }

    function signUp(readData) {
        return new Promise((resolve, reject) => {
            registerApi.signUp(readData)
                .then(result => {
                    if (result.status === 200) {
                        setState(result.data)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.access
                        router.push({name: 'offers'})
                        resolve('ok method')
                    }
                })
                .catch(e => {
                    reject(e.response.data.detail)
                })
        })
    }


    return {accessToken, refreshToken, isLogin, initState, setState, removeState, signUp}
})
