import {reactive, ref} from 'vue'
import {defineStore} from 'pinia'

import offersApi from '@/api/offers.js'


export const useCurrentOffer = defineStore('CurrentOffer', () => {
    let currentOffer = reactive({})
    let count = ref(0)


    async function getCurrentOffer(uuid) {
        try {
            const response = await offersApi.getOfferByUuid(uuid);
            Object.assign(currentOffer, response.data);
            console.log(response.data);
        } catch (e) {
            console.error('Ошибка получения данных о вакансии', e);
        }
    }

    function editOffer(offer) {
        return new Promise((resolve, reject) => {
            offersApi.putOfferByUuid(
                {
                    'uuid': currentOffer.id,
                    'currentOffer': offer
                })
                .then(result => {
                    console.log(result.data)
                    Object.assign(currentOffer, offer);
                    console.log('good')
                    resolve('good')
                })
                .catch(e => {
                    console.log('bad')
                    console.log('ошибка редактирвоания вакансии', e)
                    reject('bad')
                })
        })
    }

    return {currentOffer, count, getCurrentOffer, editOffer}
})


