<template>
  <q-dialog
    v-model="showCreateChatDialog"
  >
    <q-layout
      view="Lhh lpR fff"
      container
      class="bg-white"
      style="max-height: 420px"
    >
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>Создать чат</q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="closeCreateChatDialog(false)"
          />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <q-form
            @submit="createRoom"
            class="q-gutter-md"
          >
            <q-input
              v-model="form.room"
              label="Название комнаты"
              :maxlength="settings.max_room_title_length"
              :rules="roomNameValidator"
              outlined
              autofocus
            />
            <q-input
              v-model="form.text"
              :maxlength="settings.max_message_length"
              type="textarea"
              label="Сообщение"
              outlined
              :rules="messageValidator"
              @keydown.enter.prevent="createRoom"
            />
            <div class="flex justify-end">
              <q-btn
                class="right"
                label="Создать"
                type="submit"
                color="primary"
              />
            </div>
          </q-form>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '../store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CreateRoomForm',
  setup () {
    const router = useRouter()
    const store = useStore()

    const clearRoomName = (roomName: string) => roomName.toLowerCase().replace(/[^a-zа-яё\d\s]/gi, '')

    const roomNameValidator = [
      (val: string) => (val && val.length > 0) || 'Введите название комнаты',
      (val: string) => (val && clearRoomName(val).length > 0) || 'Некорректное  название комнаты',
      (val: string) => (val && val.length < settings.value.max_room_title_length) || `Максимально ${settings.value.max_room_title_length} символов`
    ]

    const messageValidator = [
      (val: string) => (val && val.length > 0) || 'Введите сообщение',
      (val: string) => (val && val.length < settings.value.max_message_length) || `Максимально ${settings.value.max_message_length} символов`
    ]

    const form = ref({
      room: '',
      text: ''
    })

    const closeCreateChatDialog = () => {
      store.commit('common/SET_CREATE_CHAT_DIALOG', false)
    }

    const showCreateChatDialog = computed(() => store.getters['common/showCreateChatDialog'])
    const settings = computed(() => store.getters['chat/settings'])

    const createRoom = () => {
      const socket = store.getters['common/socket']

      socket.send(JSON.stringify(form.value))
      router.push(`/chat/${form.value.room}`)

      closeCreateChatDialog()
    }

    return {
      form,
      roomNameValidator,
      messageValidator,
      showCreateChatDialog,
      settings,
      createRoom,
      closeCreateChatDialog
    }
  }
})
</script>
