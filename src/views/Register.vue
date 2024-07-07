<script setup>
import {computed, ref, watch} from "vue";
import router from '@/router/index.js'
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import registerApi from '@/api/register.js'
import {useToast} from "vue-toastification";


const toast = useToast();
const readData = computed(() => {
  return !!(username.value.length > 0 & email.value.length > 0 &
      password1.value.length > 0 & password2.value.length > 0 &
      password1.value === password2.value);

})

const register = async () => {
  try {
    if (readData.value) {
      const result = await registerApi.register({
        'username': username.value,
        'email': email.value,
        'password1': password1.value,
        'password2': password2.value
      })
      if (result.data.status === 'error') {
        toast.error(result.data.errors.map((msg, index) => `${index + 1}. ${msg}`).join('\n'),
            {timeout: 6000})
      } else {
        toast.success('Регистрация прошла успешно, пожалуйста авторизируйтесь',
            {timeout: 5000})
        username.value = ''
        email.value = ''
        password1.value = ''
        password2.value = ''
        router.push({name: 'login'});
      }
      console.log(result)
    }
  } catch {
    toast.add(
        {
          severity: 'error',
          summary: 'Процесс регистрации не удался',
          life: 10000,
          detail: 'Процесс регистрации временно приостановлен, пожалуйста повтротие процесс позже',
          contentStyleClass: 'toastMessage'
        })
  }
}


let username = ref('')
let email = ref('')
let password1 = ref('')
let password2 = ref('')

</script>

<template>
  <Toast ref="toast"/>

  <main>
    <div class="container">
      <h1>Регистрация</h1>
      <form action="" method="post">
        <FloatLabel>
          <InputText id="username" v-model="username"/>
          <label for="username">Логин</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="username" v-model="email"/>
          <label for="username">Почта</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="username" v-model="password1"/>
          <label for="username">Пароль</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="username" v-model="password2"/>
          <label for="username">Повторите пароль</label>
        </FloatLabel>
        <Button label="Зарегистрироваться" @click="register"/>
      </form>
      <router-link to="login">Уже есть аккаунт?</router-link>
      <div>

      </div>

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