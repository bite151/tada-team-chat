<template>
  <q-page class="q-pa-md flex flex-center">
    <div class="bi-align-center">
      Выберите чат или
      <button
        class="link text-blue-7"
        @click="showCreateChatDialog()"
      >
        создайте новый
      </button>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from '../store'

export default defineComponent({
  name: 'ChatPage',
  setup () {
    const store = useStore()
    const showCreateChatDialog = () => {
      store.commit('common/SET_CREATE_CHAT_DIALOG', true)
    }

    return {
      showCreateChatDialog
    }
  }
})
</script>

<style lang="sass">
.link
  text-decoration: underline
  background: none
  border: none
  cursor: pointer
  &:hover
    text-decoration: none
</style>
