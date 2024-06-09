import { Hono } from "hono";

const collectable = new Hono()

export type collectable = {
  name: string,
  rarity: string,
  img: string,
}

const collectableItems: collectable[] = [
  {
    name: "Pufflitariot",
    rarity: "legendary",
    img: "/images/puffletariot.png", 
  },
  {
    name: "Bomb Squad Puff",
    rarity: "rare",
    img: "/images/bomb_squad_puff.png", 
  },
  {
    name: "Talking Puff",
    rarity: "common",
    img: "/images/base_puff.png", 
  },
  {
    name: "Accountant Puff",
    rarity: "super rare",
    img: "/images/accountant_puff.png", 
  },
  {
    name: "HR Puff",
    rarity: "uncommon",
    img: "/images/legal_puff.png", 
  },
  {
    name: "Legal Puff",
    rarity: "rare",
    img: "/images/legal_puff.png", 
  },
  {
    name: "Daredevil Puff",
    rarity: "ultra rare",
    img: "/images/daredevil_puff.png", 
  },
]

collectable
  .get('/', (c) => c.json(collectableItems))
  // .get('/:item_id', (c) => {
  //   const item_id = parseInt(c.req.param().item_id)
  //   return c.json(collectableItems[item_id])
  // })
  .get('/random', (c) => {
    const cList = collectableItems.map((item, index) => {
      switch (item.rarity) {
        case "common": return new Array(300).fill(index)
        case "uncommon": return new Array(150).fill(index)
        case "rare": return new Array(50).fill(index)
        case "super rare": return new Array(25).fill(index)
        case "ultra rare": return new Array(10).fill(index)
        case "legendary": return new Array(5).fill(index)
      }
    }).flat()

    const rng = Math.floor(Math.random() * cList.length)
    const index = cList[rng]
    console.log(rng);
    return c.json(collectableItems[index])
  })
  .post('/', (c) => {return c.text('TODO')}) //Add new collectable to the database

export default collectable