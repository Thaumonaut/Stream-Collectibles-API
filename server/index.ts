import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { trimTrailingSlash } from 'hono/trailing-slash'
import 'dotenv/config'

import collectableRoute from './routes/collectables'
import UsersRoute from './routes/users'

// import {App as Dashboard} from './pages/dashboard'

const app = new Hono()

app.get('/', c => c.html("<h1>Welcome to Stream Colletibles</h1><p>To use the api go to '/api' to get started</p>"))

app.use(trimTrailingSlash())
// app.use('*', cors({
//   origin: '*',
//   allowHeaders: ['Origin', 'Content-Type', 'Authorization'],
//   allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
//   // credentials: true,
// }))
app.use("*", cors())
app.use("*", secureHeaders())

app.get('/api', (c) => {
  return c.text("Welcome to the Stream Collectables API")
})

app.get('/api/2/electric-boogaloo', c => c.text('Testing api 2'))


app.route('/api/collectables', collectableRoute)
app.route('/', UsersRoute)

const port = parseInt(process.env.PORT!)
const host = process.env.HOST!
if(process.env.NODE_ENVIRONMENT == "development") {
  console.log(`Server is running on ${host}:${port}`)
}

serve({
  fetch: app.fetch,
  port,
  hostname: host,
})
