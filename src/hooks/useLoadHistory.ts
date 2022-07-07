import { useStore } from 'src/store'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

export default function useLoadHistory () {
  const store = useStore()
  const route = useRoute()
  const loading = ref(true)

  const fetch = async () => {
    await store.dispatch('chat/getRoomHistory', route.params.room)
    loading.value = false
  }

  onMounted(fetch)

  return {
    loading
  }
}
