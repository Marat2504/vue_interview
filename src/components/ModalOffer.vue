<script setup>
import {useCurrentOffer} from "@/stores/currentOffer.js";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import consts from "@/tools/consts.js";
import funcs from "@/tools/funcs.js";
import {useToast} from "vue-toastification";
import {computed, reactive} from "vue";

import _ from 'lodash';
import InputNumber from "primevue/inputnumber";


const props = defineProps({
  offer: {
    type: Object,
    required: true
  }
})
const toast = useToast();
const currentOffer = useCurrentOffer()
const emit = defineEmits(['closeModal'])
let localOffers = reactive(_.cloneDeep(props.offer))

const closeModal = (value) => {
  emit('closeModal', value)
}
const employmentType = computed(() => {
  return Object.values(consts.EMPLOYMENT_TYPE)
})
const statusType = computed(() => {
  return Object.values(consts.STATUS_CHOICES)
})

function submit() {
  if (localOffers.title.length > 0) {
    const result = funcs.updateEmploymentType(localOffers)
    currentOffer.editOffer(result)
        .then(() => {
          closeModal('close')
          toast.success("Данные сохранены", {
            timeout: 2000
          })
        }
        )
        .catch(() => {
          toast.success("Ошибка", {
            timeout: 5000
          });
        })
  } else {
    toast.error("Заполните заголовок", {
        timeout: 5000
      });
  }

}


</script>
<template>
  <div id="myModal" class="modal" @click="closeModal('cancel')">
    <div class="modal-content" @click.stop>
      <span
          @click="closeModal('cancel')"
          class="close">&times;</span>
      <h2>{{ localOffers['title'] }}</h2>
      <div class="content-block">
        <InputText type="text" v-model="localOffers['title']" placeholder="Заголовок"/>
        <InputText type="text" v-model="localOffers['link']" placeholder="Ссылка"/>
        <Textarea v-model="localOffers['description']" rows="10" cols="50" placeholder="Описание"/>
        <InputNumber v-model="localOffers['salary']" inputId="mile" suffix="  руб." placeholder="Заработная плата в рублях"/>
        <InputText type="text" v-model="localOffers['location']" placeholder="Город"/>
        <InputText v-model="localOffers['contact_info']" id="contact_info" type="text" placeholder="Контактная информация"/>
        <Textarea v-model="localOffers['comments']" rows="5" cols="50"/>
        <Select v-model="localOffers['employment_type_display'][localOffers['employment_type']]"
                :options="employmentType"
                placeholder="Тип занятости"
                class="w-full md:w-56"/>
        <Select v-model="localOffers['status_display'][localOffers['status']]" :options="statusType"
                placeholder="Статус вакансии"
                class="w-full md:w-56"/>

        <div class="modal-content_button">
          <Button
              @click="submit"
              label="Сохранить"/>
          <Button
              @click="closeModal('cancel')"
              label="Отменить" severity="danger"/>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
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

.p-inputtext {
  width: 100%
}

.p-textarea {
  width: 100%;
  resize: none;
}

.p-component {
  width: 100%;
}

h2 {
  margin-top: 0;
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  padding: 20px;
}

.modal-content {
  background-color: #fff;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  position: relative;

  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.close {
  position: absolute;
  top: 0;
  right: 15px;
  color: #aaa;
  float: right;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover, .close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>