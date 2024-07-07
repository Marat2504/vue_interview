<script setup>
import {onMounted, reactive, ref} from "vue";
import {useCurrentOffer} from '@/stores/currentOffer.js'

import {useToast} from "vue-toastification";
import MyOffers from "@/components/MyOffers.vue";
import ModalOffer from "@/components/ModalOffer.vue";
import offersApi from '@/api/offers.js'
import funcs from "@/tools/funcs.js";
import _ from 'lodash';
import PopapBlock from "@/components/PopapBlock.vue";
import ProgressSpinner from 'primevue/progressspinner';


let spinner = ref(false)
let modalIsActive = ref(false)
let popapIsActive = ref(false)
let localUuid = ref('')
let vacancies = reactive([])
let sortMethod = ref('')
const currentOffer = useCurrentOffer()
const toast = useToast()


function sortOffers(value) {
  try {
    if (sortMethod.value === value) {
      sortMethod.value = '-' + value
    } else if (sortMethod.value === '-' + value) {
      sortMethod.value = value
    } else {
      sortMethod.value = value
    }
    vacancies = funcs.sortMethod(sortMethod.value, vacancies)
  } catch {
    console.log('Ошибка сортировки')
  }
}

const openOffer = (uuid) => {
  currentOffer.getCurrentOffer(uuid)
      .then(() => modalIsActive.value = true)
}

function openPopUp(uuid) {
  localUuid.value = uuid
  popapIsActive.value = true
}

const closePopup = () => popapIsActive.value = false
const deleteOffer = (uuid) => {
  new Promise(() => {
    offersApi.deleteOfferByUuid(uuid)
        .then(() => {
          toast.success('Удалено', {timeout: 2000})
          vacancies = vacancies.filter(v => v.id !== uuid)
          popapIsActive.value = false
        })
        .catch(e => {
          toast.error(`${e}`, {timeout: 2000})
        })
  })
}

function closeModal(value) {
  modalIsActive.value = false
  if (value === 'close') {
    // const index = vacancies.findIndex(obj => obj.id === currentOffer.currentOffer.id)
    // if (index !== -1) {
    //   Object.assign(vacancies[index], currentOffer.currentOffer)
    // } else {
    //   console.log('Обект не найден')
    // }
    getOffers()
  }
}

const getOffers = async () => {
  const result = await offersApi.getOffers()
  return Object.assign(vacancies, result.data)
}
onMounted(() => getOffers())
</script>

<template>

  <div v-if="spinner" class="overlay">
  <ProgressSpinner style="width: 100px; height: 100px" strokeWidth="6" fill="transparent"
                   animationDuration=".9s" aria-label="Custom ProgressSpinner"

  />
  </div>
  <modal-offer
      v-if="modalIsActive"
      :offer="_.cloneDeep(currentOffer.currentOffer)"
      @close-modal="closeModal"
  />
  <my-offers
      v-if="vacancies.length > 0"
      :vacancies=vacancies
      @sort-offers="sortOffers"
      @open-offer="openOffer"
      @open-pop-up="openPopUp"
  />
  <popap-block
      v-if="popapIsActive"
      :uuid="localUuid"
      @delete-offer="deleteOffer"
      @close-popup="closePopup"
  />
</template>

<style scoped>

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Высокий z-index, чтобы быть на переднем плане */
}

.spinner {
  width: 100px;
  height: 100px;
}
</style>