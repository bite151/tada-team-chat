export interface CommonStateInterface {
  socket: object | null
  showCreateChatDialog: boolean
}

function state (): CommonStateInterface {
  return {
    socket: null,
    showCreateChatDialog: false
  }
}

export default state
