import { useStore } from 'src/store'
import { onMounted, ref } from 'vue'

export default function useLoadRooms () {
  const store = useStore()
  const loading = ref(true)

  const fetch = async () => {
    await store.dispatch('chat/getRooms')
    loading.value = false
  }

  onMounted(fetch)

  return {
    loading
  }
}
