<template>
  <q-page class="row q-pa-md justify-between">
    <div
      class="full-width"
      v-if="!loading"
    >
      <q-chat-message
        v-for="message in chat"
        :key="message.created"
        :name="message.sender.username"
        :text="[message.text]"
        :sent="user.username === message.sender.username"
        :stamp="getDate(message)"
      />
    </div>
    <q-footer elevated class="bg-white q-pa-md">
      <q-form
        @submit="sendMessage"
        class="q-gutter-md row flex justify-between no-wrap"
      >
        <q-input
          ref="messageInput"
          v-model="text"
          style="width: calc(100% - 80px)"
          autofocus
          :maxlength="settings.max_message_length"
          label="сообщение"
          type="textarea"
          rounded
          outlined
          @keydown.enter.prevent="sendMessage"
        />
        <div>
          <q-btn
            type="submit"
            round
            color="primary"
            icon="send"
          />
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useLoadHistory from '../hooks/useLoadHistory'
import { useStore } from '../store'
import useFormatMessageDate from '../hooks/useFormatMessageDate'
import _ from 'lodash'

export default defineComponent({
  name: 'ChatRoomPage',
  setup: function () {
    const route = useRoute()
    const store = useStore()

    const messageInput = ref(null)
    const { loading } = useLoadHistory()
    const text = ref('')

    const rooms = computed(() => store.getters['chat/rooms'])
    const user = computed(() => store.getters['chat/user'])
    const settings = computed(() => store.getters['chat/settings'])
    const chat = computed(() => store.getters['chat/history']
      ?.filter(message => message.room === route.params.room)
    )

    const sendMessage = () => {
      const socket = store.getters['common/socket']

      socket.send(JSON.stringify({
        room: route.params.room,
        text: text.value
      }))
      text.value = ''
    }

    const getDate = (message) => useFormatMessageDate(message)

    watch(
      () => chat, () => {
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight)
        }, 20)
      },
      { deep: true }
    )

    watch(
      () => _.cloneDeep(route.params.room), (val) => {
        if (messageInput.value) {
          messageInput.value.focus()
        }
      }
    )

    return {
      messageInput,
      loading,
      text,
      rooms,
      user,
      settings,
      chat,
      sendMessage,
      getDate
    }
  }
})
</script>
