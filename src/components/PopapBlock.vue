<script setup>
defineProps({
  uuid: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['deleteOffer', 'closePopup'])
const deleteOffer = (value) => emit('deleteOffer', value)
const closePopup = () => emit('closePopup')
</script>

<template>
  <!--  Попап-->
  <div class="modal" id="myModal" @click="closePopup">
    <div class="modal-content" @click.stop>
      <h2>Подтверждение</h2>
      <p>Вы уверены, что хотите удалить этот элемент?</p>
      <div class="modal-content_button">
        <Button
            @click="deleteOffer(uuid)"
            label="Удалить" severity="danger"/>
        <Button
            @click="closePopup"
            label="Отменить" severity="severity"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Основные стили для попапа */
body {
  font-family: Arial, sans-serif;
  overflow: hidden; /* Prevent background scrolling when modal is open */
}

.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */
}

.modal-content {
  position: fixed;
  background: #fff;
  width: 30%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
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