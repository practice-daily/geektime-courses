<template>
  <!-- <router-link to=""/>home</router-link> -->
  <a :href="'#' + props.to">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'VueRouterLink'
}
</script>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>
