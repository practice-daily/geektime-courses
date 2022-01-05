<template>
  <!-- <router-link to=""/>home</router-link> -->
  <a :href="'#' + props.to">
    <slot></slot>
  </a>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>
