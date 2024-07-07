import axios from "@/api/axios.js";

const getOffers = () => {
    return axios.get('/offers/')
}


const getOfferByUuid = (uuid) => {
    return axios.get(`/offers/${uuid}/`)
}

const putOfferByUuid = (data) => {
    return axios.put(`/offers/${data.uuid}/`, data.currentOffer)
}

const deleteOfferByUuid = (uuid) => {
    return axios.delete(`/offers/${uuid}/`)
}

const createNewOffer = (data) => {
    return axios.post(`/offers/add/`, data)
}

export default {
    getOffers, getOfferByUuid, putOfferByUuid, deleteOfferByUuid, createNewOffer
}