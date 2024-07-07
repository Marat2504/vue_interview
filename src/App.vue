<script setup>
import {RouterView} from 'vue-router'
import {useAuth} from '@/stores/useAuth.js'
import NavBar from "@/components/NavBar.vue";

const auth = useAuth()
auth.initState()

</script>

<template>
  <body>
  <nav-bar
      v-if="auth.isLogin"
  />
  <RouterView/>
  </body>
</template>

<style scoped>

</style>
