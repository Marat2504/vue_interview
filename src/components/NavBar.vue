<script setup>
import {useAuth} from "@/stores/useAuth.js";

const auth = useAuth()
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-content">
        <div class="navbar-left">
          <router-link :to="{name: 'addOffer'}" class="nav-item">Добавить вакансию</router-link>
        </div>
        <div class="navbar-right">
          <button @click="auth.removeState" class="nav-item logout">Выход</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background-color: #333;
  color: #fff;
}

.navbar-container {
  max-width: 1000px;
  margin: 0 auto;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.navbar-left, .navbar-right {
  display: flex;
  align-items: center;
}

.nav-item {
  margin: 0 1rem;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
}

.nav-item:hover {
  color: #ccc;
}

.logout {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}

.logout:hover {
  color: #ff6b6b;
}
</style>