import { MutationTree } from 'vuex'
import { CommonStateInterface } from './state'

const mutation: MutationTree<CommonStateInterface> = {
  SET_CREATE_CHAT_DIALOG: (state: CommonStateInterface, payload: boolean) => (state.showCreateChatDialog = payload),
  SET_SOCKET: (state: CommonStateInterface, socket: object) => (state.socket = socket)
}

export default mutation
