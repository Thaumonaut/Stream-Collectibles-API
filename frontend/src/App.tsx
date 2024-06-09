import { createSignal, createEffect, Show } from 'solid-js'
import './App.css'
import type {collectable } from '../../server/routes/collectables'
import { Popover } from 'solid-simple-popover'
import { flip } from "@floating-ui/dom";

function App() {
  const [count, setCount] = createSignal(0)
  const [item, setItem] = createSignal<collectable|undefined>(undefined)
  const [collectables, setCollectables] = createSignal<collectable[]>([])

  createEffect(async ()=> {
    getCollectables()

  })

  const getCollectables = async function() {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/collectables/`)
    const data = await res.json();
    setCollectables(data)
  }

  const getRandomCollectable = async function() {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/collectables/random`)
    const data: collectable = await res.json()
    setItem(data);
  }

  return (
    <>
      <h1>Stream Collectables</h1>
      <div class="card">
        <Show when={item()}>
          <div class='card'>
            <p style={{
              "font-size": "2rem", 
              "line-height": "1rem",
              "font-weight": 800,
            }}> {item()?.name} </p>
            <img src={item()?.img} alt="" />
          </div>
        </Show>
        <button onClick={() => getRandomCollectable()}>
          Try your luck!
        </button>
        <h2>Current Collectables</h2>
        <Show when={collectables()}>
          <ul style={{"list-style": "none", 
            "text-align": 'left'
          }}>
            {collectables().map(c => {
              return (
                <li>
                  {c.name} : {c.rarity}
                </li>
              )
              })}
          </ul>
        </Show>
      </div>
    </>
  )
}

export default App
