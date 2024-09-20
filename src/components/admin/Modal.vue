<template>
    <div v-if="isOpen" class="modal">
      <div class="modal-content">
        <span @click="$emit('close')" class="close">&times;</span>
        <header>
          <slot name="header"></slot>
        </header>
        <main>
          <slot name="body"></slot>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    isOpen: Boolean,
  });
  </script>
  
  <style scoped>
  .modal {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    width: 50%;
  }
  
  .close {
    color: red;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  </style>
  