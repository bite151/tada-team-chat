import { Message } from 'src/models/chat'
import { date } from 'quasar'

export default function useFormatMessageDate (message: Message) {
  const now = Date.now()
  const diff = date.getDateDiff(now, message.created, 'days')

  const format = (!diff) ? 'HH:mm' : 'DD.MM.YYYY HH:mm'
  return date.formatDate(message.created, format)
}
