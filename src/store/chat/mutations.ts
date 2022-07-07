import { MutationTree } from 'vuex'
import { ChatStateInterface } from './state'
import { Message, Room, Sender, Settings } from 'src/models/chat'

const mutation: MutationTree<ChatStateInterface> = {
  SET_ROOMS: (state: ChatStateInterface, room: Room[]) => (state.rooms = room),
  SET_ROOM: (state: ChatStateInterface, room: Room) => {
    if (state.rooms) {
      state.rooms.unshift(room)
    }
  },
  SET_ROOM_LAST_MESSAGE: (state: ChatStateInterface, message: Message) => {
    if (state.rooms) {
      const index = state.rooms.findIndex(room => room.name === message.room)
      if (index >= 0) {
        state.rooms[index].last_message = message
      }
    }
  },
  SET_MESSAGE: (state: ChatStateInterface, message: Message) => {
    if (state.history) {
      state.history.push(message)
    } else {
      state.history = [message]
    }
  },
  SET_HISTORY: (state: ChatStateInterface, payload: Message[]) => (state.history = payload),
  SET_USERNAME: (state: ChatStateInterface, user: Sender) => (state.user = user),
  SET_SETTINGS: (state: ChatStateInterface, payload: Settings) => (state.settings = payload)
}

export default mutation
