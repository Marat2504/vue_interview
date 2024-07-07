<script setup>
import {useToast} from "vue-toastification";
import {useRoute} from 'vue-router';
import isURL from 'validator/lib/isURL'
import Select from "primevue/select";
import Textarea from "primevue/textarea";
import DatePicker from 'primevue/datepicker';
import InputText from "primevue/inputtext";
import InputNumber from 'primevue/inputnumber';
import {computed, reactive, watch} from "vue";
import consts from "@/tools/consts.js";
import router from "@/router/index.js";
import offersApi from '@/api/offers.js'
import funcs from "@/tools/funcs.js";


const route = useRoute();
const employmentType = computed(() => {
  return Object.values(consts.EMPLOYMENT_TYPE)
})
const statusType = computed(() => {
  return Object.values(consts.STATUS_CHOICES)
})
const toast = useToast()
let offer = reactive({
  id: '',
  title: '',
  link: '',
  description: '',
  salary: '',
  location: '',
  employment_type: '',
  employment_type_display: {
    0: 'Удаленная работа'
  },
  publish_date: '',
  contact_info: '',
  comments: '',
  status: 0,
  status_display: {
    0: 'На рассмотрении'
  }
})

const cancel = () => router.push('offers')
const formValidate = computed(() => {
  if (offer.title.length === 0) {
    toast.error('Название вакансии является обязательным полем', {timeout: 5000})
    return false
  }
  if (offer.salary.length === 0) {
    toast.error('Некорректно заполнено поле заработной платы', {timeout: 5000})
    return false
  }
  if (!isURL(offer.link, {require_protocol: true})) {
    toast.error('Некорректно заполнено поле ссылка', {timeout: 5000})
    return false
  }
  if (offer.publish_date.length === 0) {
    toast.error('Дата подачи вакансии является обязательным полем', {timeout: 5000})
    return false
  }
  if (Object.values(offer.employment_type_display)[0].length === 0) {
    toast.error('Выбирите тип занятости', {timeout: 5000})
    return false
  }
  if (Object.values(offer.status_display)[0].length === 0) {
    toast.error('Выбирите статус вакансии', {timeout: 5000})
    return false
  }

  return true
})

function saveData() {
  if (formValidate.value) {
    return new Promise(() => {
      offersApi.createNewOffer(funcs.updateEmploymentType(offer))
          .then(result => {
            toast.success('Вакансия создана', {timeout: 3000})
            offer = {
              id: '',
              title: '',
              link: '',
              description: '',
              salary: '',
              location: '',
              employment_type: '',
              employment_type_display: {
                0: 'Удаленная работа'
              },
              publish_date: '',
              contact_info: '',
              comments: '',
              status: 0,
              status_display: {
                0: 'На рассмотрении'
              }
            }
            router.push({name: 'offers'})
            console.log(result)
          })
          .catch(e => {
            console.log(funcs.errorProcessing(e.response.data))
            toast.error('Некорректно заполнены данные', {timeout: 5000})
          })
    })
  }
}

watch(() => route.path, (newPath, oldPath) => {
  if (newPath !== oldPath) {
    console.log(route, route.path, oldPath, newPath)
  }
})
</script>

<template>
  <h2>Новая вакансия</h2>
  <form action="">
    <div class="content-block">
      <InputText v-model="offer.title" id="title" type="text" placeholder="Название вакансии"/>
      <InputText v-model="offer.link" id="link" type="text" placeholder="Ссылка в формате: https://site.ru"/>
      <Textarea v-model="offer.description" id="description" rows="10" cols="50" placeholder="Описание вакансии"/>
      <InputNumber v-model="offer.salary" inputId="mile" suffix="  руб." placeholder="Заработная плата в рублях"/>
      <InputText v-model="offer.location" id="city" type="text" placeholder="Город"/>
      <InputText v-model="offer.contact_info" id="contact_info" type="text" placeholder="Контактная информация"/>
      <Textarea v-model="offer.comments" id="comment" rows="5" cols="50" placeholder="Комментарий"/>
      <DatePicker id="datepicker-24h" v-model="offer.publish_date" showTime hourFormat="24"
                  placeholder="Дата/Время подачи вакансии"/>

      <div class="modal-content_button">
        <Select
            v-model="offer.employment_type_display[0]"
            :options="employmentType"
            placeholder="Тип занятости"
            class="w-full md:w-56"
            style="font-size: 22px;"/>
        <Select
            v-model="offer.status_display[0]"
            :options="statusType"
            placeholder="Статус вакансии"
            class="w-full md:w-56"
            style="font-size: 22px;"/>
      </div>
      <div class="modal-content_button">
        <Button
            @click="saveData"
            label="Сохранить"/>
        <Button
            @click="cancel"
            label="Отменить" severity="danger"/>
      </div>
    </div>
  </form>

</template>

<style scoped>
input, textarea {
  font-size: 18px;
}

h2 {
  text-align: center;
}

.content-block {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
}

.modal-content_button {
  width: 100%;
  display: flex;
  flex: 1 1;
  gap: 10px;
}

.p-component {
  width: 100%;
}
</style>