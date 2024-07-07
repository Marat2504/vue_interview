import axios from "@/api/axios.js";

const register = (data) => {
    return axios.post('/auth/signup/', data)
}

const signUp = (data) => {
    return axios.post('/auth/token/', data)
}

const refresh = (data) => {
    return axios.post('/auth/token/refresh/', data)
}

export default {
    register,
    signUp,
    refresh
}