import { Middleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

const middlewares: Middleware[] = []

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    // ...options
  })

  middlewares.push(logger)
}

export default middlewares
