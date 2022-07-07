<template>
  <div v-if="!loading">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data: () => ({
    loading: false
  }),
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.loading = true
      await this.$store.dispatch('chat/getSettings')
      this.loading = false
    }
  }
})
</script>
