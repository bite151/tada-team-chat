<template>
  <q-drawer
    show-if-above
    v-model="showSidebar"
    :width="400"
    :breakpoint="700"
    behavior="desktop"
    class="bg-grey-2"
  >
    <q-item-label
      header
      class="flex justify-between"
    >
      Chat rooms
      <q-btn
        size="xs"
        round
        color="primary"
        icon="add"
        @click="showCreateChatDialog()"
      />
    </q-item-label>
    <q-scroll-area
      class="rooms-list"
      v-if="!loading"
    >
      <q-list>
        <RoomLink
          v-for="room in rooms"
          :key="room.name"
          :room="room"
          test="afsdfsd"
        />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import RoomLink from 'components/RoomLink.vue'
import useLoadRooms from 'src/hooks/useLoadRooms'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'RoomsList',
  components: { RoomLink },
  setup () {
    const store = useStore()
    const { loading } = useLoadRooms()
    const showSidebar = ref(true)
    const rooms = computed(() => store.getters['chat/rooms'])

    const showCreateChatDialog = () => {
      store.commit('common/SET_CREATE_CHAT_DIALOG', true)
    }

    return {
      loading,
      showSidebar,
      rooms,
      showCreateChatDialog
    }
  }
})
</script>

<style lang="sass">
.rooms-list
  width: 100%
  height: calc(100vh - 57px)
</style>
