<template>
  <q-item
    tag="a"
    clickable
    v-ripple
    @click="openRoom(room.name)"
  >
    <q-item-section avatar>
      <q-avatar color="blue" text-color="white">
        {{ room.last_message.sender.username[0].toUpperCase() }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label
        lines="1"
        class="text-weight-bold"
      >
        {{ room.name }}
      </q-item-label>
      <q-item-label caption lines="2">
        <span class="text-weight-bold">
          {{ room.last_message.sender.username }}
        </span>
        -- {{ room.last_message.text }}
      </q-item-label>
    </q-item-section>

    <q-item-section side top>
      {{ getDate(room.last_message) }}
    </q-item-section>
  </q-item>
  <q-separator inset="item" />
</template>

<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'
import useFormatMessageDate from 'src/hooks/useFormatMessageDate'
import { Message, Room } from 'src/models/chat'

interface Props {
  room: Room
}

const store = useStore()
const router = useRouter()
const props = defineProps<Props>()

const { room } = toRefs(props)
const getDate = (message: Message) => useFormatMessageDate(message)

const openRoom = async (roomName: string) => {
  await store.dispatch('chat/getRoomHistory', roomName)
  await router.push(`/chat/${roomName}`)

  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, 25)
}
</script>
