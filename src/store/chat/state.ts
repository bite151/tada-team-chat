import { Message, Room, Sender, Settings } from 'src/models/chat'

export interface ChatStateInterface {
  loading: boolean,
  rooms: Room[] | null
  history: Message[] | null
  settings: Settings | null
  user: Sender | null
}

function state (): ChatStateInterface {
  return {
    loading: false,
    rooms: null,
    history: null,
    settings: null,
    user: {
      username: 'Anonymous'
    }
  }
}

export default state
