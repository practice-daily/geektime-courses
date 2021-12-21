import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function mousemove(e) {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', mousemove)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', mousemove)
  })

  return { x, y }
}