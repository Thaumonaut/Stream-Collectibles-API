import { createSignal, createEffect } from 'solid-js'
import './App.css'

function App() {
  const [count, setCount] = createSignal(0)
  const [collecible, setCollectible] = createSignal(0)

  createEffect(async ()=> {
    getCollectibles()

  })

  const getCollectibles = async function() {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/collectibles/${count()}`)
    const data = await res.json();
    setCollectible(data.Result)
  }

  return (
    <>
      <h1>Vite + Solid</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          {collecible()}
        </p>
      </div>
    </>
  )
}

export default App
