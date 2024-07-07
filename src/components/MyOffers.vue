<script setup>
import consts from "@/tools/consts.js";
import funcs from "../tools/funcs.js";


defineProps({
  vacancies: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['sortOffers', 'openOffer', 'openPopUp'])
const sortOffers = (value) => emit('sortOffers', value)
const openOffer = (value) => emit('openOffer', value)
const openPopUp = (value) => emit('openPopUp', value)
const getClassForStatus = (status) => {
  switch (status) {
    case 1:
      return 'grey';
    case 2:
      return 'blue';
    case 3:
      return 'green';
    case 4:
      return 'red';
    default:
      return '';
  }
}

</script>

<template>


  <div class="table-container">
    <h1>Мои Вакансии</h1>
    <table class="vacancies-table">
      <thead>
      <tr>
        <th
            @click="sortOffers('title')"
            style="cursor: pointer"
            class="hover-class"
        >Вакансия<span class="sort-icon"></span></th>
        <th>Ссылка</th>
        <th
            @click="sortOffers('salary')"
            class="hover-class"
            style="cursor: pointer">Зарплата<span class="sort-icon"></span></th>
        <th
            @click="sortOffers('employment_type')"
            class="hover-class"
            style="cursor: pointer">Тип занятости<span class="sort-icon"></span></th>
        <th
            @click="sortOffers('status')"
            class="hover-class"
            style="cursor: pointer">Статус<span class="sort-icon"></span></th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="vacancy in vacancies" :key="vacancy.id">
        <td
            @click="openOffer(vacancy.id)"
            class="title-link">{{ vacancy.title }}
        </td>
        <td><a target="_blank" rel="noopener noreferrer" :href="vacancy.link">Перейти</a></td>
        <td>{{funcs.formatPrice(vacancy.salary)}}</td>
        <td>{{ consts.EMPLOYMENT_TYPE[vacancy.employment_type] }}</td>
        <td
            :class='getClassForStatus(vacancy.status)'>
          {{ consts.STATUS_CHOICES[vacancy.status] }}
        </td>
        <td>
          <i
              @click="openOffer(vacancy.id)"
              class="pi pi-pencil border-icon" :style="{color: 'green', fontSize: '1rem'}"></i>&nbsp;&nbsp;
          <i
              @click="openPopUp(vacancy.id)"
              class="pi pi-trash border-icon" :style="{color: 'red', fontSize: '1rem'}"></i>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.grey {
  background-color: #f5f1f1;
}

.blue {
  background-color: #ccccff;
}

.green {
  background-color: #d9ffd9;
}

.red {
  background-color: #ffd3d3;
}

.border-icon {
  border: 2px solid #007bff;
  padding: 5px;
  border-radius: 4px 4px 4px 4px;
  transition: ease all 0.3s;
}

.border-icon:hover {
  color: black;
  border: 2px solid #007bff;
  background-color: white;
}

.hover-class:hover {
  background-color: #dddddd;
}

.sort-icon::after {
  content: ' ⇅';
}

.pi, .title-link {
  cursor: pointer;
  font-weight: bold;
}

.table-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

table.vacancies-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
}

table.vacancies-table th,
table.vacancies-table td {
  padding: 12px 15px;
//border: 1px solid #ddd; border: none;
}
tr {
  transition: all 0.3s ease;
}
tr:hover {
  background-color: #dfefdc;
}

table.vacancies-table th {
  background-color: #f4f4f4;
  color: #333;
  font-weight: bold;
}

.vacancies-table a {
  color: #007bff;
  text-decoration: none;
}

.vacancies-table a:hover {
  text-decoration: underline;
}

/* Фиксированная ширина столбцов */
/* Title */
.vacancies-table td:nth-child(1) {
  width: 200px;
}

/* Link */
.vacancies-table td:nth-child(2) {
  width: 50px;
}

/* Salary */
.vacancies-table td:nth-child(3) {
  width: 100px;
}

/* Employment Type */
.vacancies-table td:nth-child(4) {
  width: 150px;
}

/* Status */
.vacancies-table td:nth-child(5) {
  width: 100px;
}

/* Action */
.vacancies-table td:nth-child(6) {
  width: 50px;
}
</style>