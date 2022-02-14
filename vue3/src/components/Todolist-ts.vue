<script setup lang="ts">
import { ref, Ref } from 'vue'

interface Todo {
  title: string,
  done: boolean
}

const todos: Ref<Todo[]> = ref([
  { title: 'learn vue3', done: false }
])
</script>