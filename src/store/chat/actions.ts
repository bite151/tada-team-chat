import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ChatStateInterface } from './state'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

function getErrorMessage (error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

const reportError = (message: string): void => {
  Notify.create(message)
}

const actions: ActionTree<ChatStateInterface, StateInterface> = {
  async getRooms ({ commit }): Promise<void> {
    try {
      const { data } = await api.get('/rooms')
      commit('SET_ROOMS', data.result)
    } catch (error) {
      reportError(getErrorMessage(error))
    }
  },

  async getRoomHistory ({ commit }, roomName: string): Promise<void> {
    try {
      const { data } = await api.get(`/rooms/${roomName}/history`)
      commit('SET_HISTORY', data.result)
    } catch (error) {
      reportError(getErrorMessage(error))
    }
  },

  async getSettings ({ commit }): Promise<void> {
    try {
      const { data } = await api.get('/settings')
      commit('SET_SETTINGS', data.result)
    } catch (error) {
      reportError(getErrorMessage(error))
    }
  }
}

export default actions
