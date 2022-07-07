import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { CommonStateInterface } from './state'

const getters: GetterTree<CommonStateInterface, StateInterface> = {
  socket: s => s.socket,
  showCreateChatDialog: s => s.showCreateChatDialog
}

export default getters
