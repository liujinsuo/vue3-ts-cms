import { App } from '@vue/runtime-core'
import registerElement from './register-element'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
}
