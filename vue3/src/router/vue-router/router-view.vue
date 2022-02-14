<template>
  <!-- <router-view></router-view> -->
  <component :is="comp"></component>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from './index'

const router = useRouter()

const comp = computed(() => {
  const route = router.routes.find((_route) => _route.path === router.current.value)
  return route ? route.component : null
})
</script>

<script>
export default {
  name: 'VueRouterView',
}
</script>
