/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import { FC, useState } from 'hono/jsx'

const Counter: FC = function(props) {
  const { count } = props
  return (
    <div>
      <form action={"/api/increment"} method="post" title='Counter' id='counter' name='counter'>
        <input type="number" name="count" id="count" value={count}/>
        <button type='submit' form='counter'>Increment</button>
      </form>
    </div>
  )
}

export const App = function(count: Number) {
  return (
    <html>
      <body>
        <Counter count={count}/>
      </body>
    </html>
  )
}