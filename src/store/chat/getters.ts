import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ChatStateInterface } from './state'

const getters: GetterTree<ChatStateInterface, StateInterface> = {
  rooms: s => s.rooms,
  history: s => s.history,
  settings: s => s.settings,
  user: s => s.user
}

export default getters
