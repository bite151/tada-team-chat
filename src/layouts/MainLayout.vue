<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="flex justify-between">
          <span>{{ $route.params.room }}</span>
          <q-btn
            flat
            color="white"
            icon="logout"
            @click="logOut"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <RoomsList />

    <q-page-container>
      <router-view />
    </q-page-container>

    <CreateRoomForm />
  </q-layout>
</template>

<script>
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import RoomsList from 'components/RoomsList.vue'
import CreateRoomForm from 'components/CreateRoomForm.vue'
import { useStore } from '../store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  components: { CreateRoomForm, RoomsList },
  setup () {
    const store = useStore()
    const router = useRouter()

    const user = computed(() => store.getters['chat/user'])
    const rooms = computed(() => store.getters['chat/rooms'])
    const socket = computed(() => store.getters['common/socket'])

    const closeConnection = () => {
      socket.value.removeEventListener('message', undefined)
      socket.value.close()
    }

    const logOut = () => {
      store.commit('chat/SET_USERNAME', { username: 'Anonymous' })
      localStorage.removeItem('userName')
      closeConnection()
      router.push('/')
    }

    onMounted(() => {
      const username = localStorage.getItem('userName')
      if (username) {
        store.commit('chat/SET_USERNAME', { username })
      }

      const socket = new WebSocket(`wss://nane.tada.team/ws?username=${user.value.username}`)
      store.commit('common/SET_SOCKET', socket)

      socket.addEventListener('message', ({ data }) => {
        data = JSON.parse(data)
        const roomsList = rooms.value.map(room => room.name)

        if (!roomsList.includes(data.room)) {
          const room = {
            name: data.room,
            last_message: data
          }
          store.commit('chat/SET_ROOM', room)
        }

        store.commit('chat/SET_ROOM_LAST_MESSAGE', data)
        store.commit('chat/SET_MESSAGE', data)
      })
    })

    onBeforeUnmount(() => {
      closeConnection()
    })

    return {
      user,
      logOut
    }
  }
})
</script>
