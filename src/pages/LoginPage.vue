<template>
  <q-page class="q-pa-md flex flex-center">
    <div class="bi-align-center">
      <q-form
        @submit="login"
        class="q-gutter-md"
        style="width: 300px"
      >
        <q-input
          v-model="username"
          label="Ваше имя"
          :maxlength="settings.max_username_length"
          :rules="userNameValidator"
          outlined
          autofocus
        />
        <div class="flex justify-end">
          <q-btn
            class="right"
            label="Войти"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useStore } from '../store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const store = useStore()
    const router = useRouter()

    const loading = ref(false)
    const username = ref('')

    const clearUserName = (username: string) => username.toLowerCase().replace(/[^a-zа-яё\d\s]/gi, '')

    const userNameValidator = [
      (val: string) => (val && val.length > 0) || 'Введите имя',
      (val: string) => (val && clearUserName(val).length > 0) || 'Некорректное имя',
      (val: string) => (val && val.length < settings.value.max_username_length) ||
        `Максимально ${settings.value.max_room_title_length} символов`
    ]

    const settings = computed(() => {
      return store.getters['chat/settings']
    })

    const login = () => {
      const user = clearUserName(username.value)
      store.commit('chat/SET_USERNAME', { username: user })
      localStorage.setItem('userName', user)
      router.push('/chat')
    }

    return {
      loading,
      username,
      userNameValidator,
      settings,
      login
    }
  }
})
</script>

<style lang="sass" scoped>
.link
  text-decoration: underline
  background: none
  border: none
  cursor: pointer
  &:hover
    text-decoration: none
</style>
