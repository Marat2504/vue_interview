<script setup>
import {useToast} from "vue-toastification";
import {useAuth} from '@/stores/useAuth.js'
import {computed, ref} from "vue";

import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';




const auth = useAuth()
const toast = useToast();
const readData = computed(() => {
  return !!(username.value.length > 0 & password.value.length > 0);

})

const signUp = () => {
  if (readData.value) {
    auth.signUp({
      'username': username.value,
      'password': password.value
    })
        .then(response => {
          toast.success("Вы в системе", {
            timeout: 3000
          });
          console.log(response)
        })
        .catch(e => {
          toast.error(`${e}`, {
            timeout: 3000
          });
        })
  }
}

let username = ref('')
let password = ref('')

</script>

<template>
  <Toast ref="toast"/>

  <main>
    <div class="container">
      <h1>Авторизация</h1>
      <form action="" method="post">
        <FloatLabel>
          <InputText id="username" v-model="username"/>
          <label for="username">Логин</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="username" v-model="password"/>
          <label for="username">Пароль</label>
        </FloatLabel>
        <Button label="Войти" @click="signUp"/>
      </form>
      <router-link to="register">Еще не зарегистрированы?</router-link>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center; /* Выравнивание по горизонтали */
  align-items: center; /* Выравнивание по вертикали */
}

.container {
  padding: 50px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin: 0 auto;
}

form {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
  align-items: center;
}

.p-floatlabel {
  width: 100%;
}

.p-inputtext {
  width: 100%
}

.p-button {
  width: 100%;
}

a {
  color: blue;
}
</style>


<!--const signUp = async () => {-->
<!--  try {-->
<!--    if (readData.value) {-->
<!--      const result = await registerApi.signUp({-->
<!--        'username': username.value,-->
<!--        'password': password.value-->
<!--      })-->
<!--      if (result.status === 200) {-->
<!--        auth.setState(result.data)-->
<!--        await toast.add(-->
<!--            {-->
<!--              severity: 'success',-->
<!--              summary: 'Поздравляем!',-->
<!--              life: 5000,-->
<!--              detail: 'Вы вошли в систему',-->
<!--              contentStyleClass: 'toastMessage'-->
<!--            })-->
<!--        axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.access-->
<!--        router.push({name: 'offers'})-->
<!--      }-->
<!--      console.log(result)-->

<!--    }-->
<!--  } catch {-->
<!--    toast.add(-->
<!--        {-->
<!--          severity: 'error',-->
<!--          summary: 'Авторизация не удалась',-->
<!--          life: 10000,-->
<!--          detail: 'Введите корректные логин и пароль',-->
<!--          contentStyleClass: 'toastMessage'-->
<!--        })-->
<!--  }-->
<!--}-->