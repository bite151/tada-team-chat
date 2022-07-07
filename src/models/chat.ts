export interface Sender {
  username: string
}

export interface Message {
  room: string
  created: string
  sender: Sender
  text: string
}

export interface Room {
  name: string
  last_message: Message
}

export interface Settings {
  max_message_length: number
  max_room_title_length: number
  max_username_length: number
  uptime: number
}
