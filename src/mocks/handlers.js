import { Auth } from './auth.mock'
import { Events } from './events.mock'

export const handlers = [
  ...Auth,
  ...Events
]