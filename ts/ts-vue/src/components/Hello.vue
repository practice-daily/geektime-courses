<template>
  <div class="hello">
    Hello {{name}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      name: 'TypeScript'
    }
  }
})
</script>

<style>
.hello {
  color: skyblue;
}
</style>