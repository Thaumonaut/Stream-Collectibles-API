import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { trimTrailingSlash } from 'hono/trailing-slash'
import 'dotenv/config'

import collectibleRoute from './routes/collectibles'

// import {App as Dashboard} from './pages/dashboard'

const app = new Hono().basePath('/api')

app.use(trimTrailingSlash())
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Origin', 'Content-Type', 'Authorization'],
  allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
  // credentials: true,
}))
app.get('/', (c) => {
  return c.text("Welcome to the Stream Collectibles API")
})

app.get('/2/boogaloo', c => c.text('Testing api 2'))


app.route('/collectibles', collectibleRoute)

const port = parseInt(process.env.PORT!)
const host = process.env.HOST!
console.log(`Server is running on ${host}:${port}`)

serve({
  fetch: app.fetch,
  port,
  hostname: host,
})
