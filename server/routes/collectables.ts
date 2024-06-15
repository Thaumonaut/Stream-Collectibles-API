import { Hono } from "hono";

const collectable = new Hono()

export type collectable = {
  name: string,
  rarity: string,
  img: string,
}

const collectableItems: collectable[] = [
  {
    name: "Working Puff",
    rarity: "common",
    img: "/images/base_puff.png", 
  },
  {
    name: "Pi Puff",
    rarity: "common",
    img: "/images/base_puff.png", 
  },
  {
    name: "Janitor Puff",
    rarity: "common",
    img: "/images/base_puff.png", 
  },
  {
    name: "HR Puff",
    rarity: "uncommon",
    img: "/images/legal_puff.png", 
  },
  {
    name: "Maintenance Puff",
    rarity: "uncommon",
    img: "/images/legal_puff.png", 
  },
  {
    name: "Cameraman Puff",
    rarity: "uncommon",
    img: "/images/legal_puff.png", 
  },
  {
    name: "HR Puff",
    rarity: "uncommon",
    img: "/images/legal_puff.png", 
  },
  {
    name: "Yandere Puff",
    rarity: "uncommon",
    img: "/images/legal_puff.png", 
  },
  {
    name: "Legal Puff",
    rarity: "rare",
    img: "/images/legal_puff.png", 
  },
  {
    name: "Puff P.I.",
    rarity: "rare",
    img: "/images/legal_puff.png", 
  },
  {
    name: "Bomb Squad Puff",
    rarity: "rare",
    img: "/images/bomb_squad_puff.png", 
  },
  {
    name: "Bouncer Puff",
    rarity: "rare",
    img: "/images/bomb_squad_puff.png", 
  },
  {
    name: "Accountant Puff",
    rarity: "super rare",
    img: "/images/accountant_puff.png", 
  },
  {
    name: "Puff-u-pine",
    rarity: "super rare",
    img: "/images/base_puff.png", 
  },
  {
    name: "Puff-apple",
    rarity: "super rare",
    img: "/images/base_puff.png", 
  },
  {
    name: "Daredevil Puff",
    rarity: "ultra rare",
    img: "/images/daredevil_puff.png", 
  },
  {
    name: "Agent Puff",
    rarity: "ultra rare",
    img: "/images/daredevil_puff.png", 
  },
  {
    name: "Pufflitariot",
    rarity: "legendary",
    img: "/images/puffletariot.png", 
  },
  {
    name: "THE Talking Puff",
    rarity: "legendary",
    img: "/images/base_puff.png", 
  },
]

collectable
  .get('/', (c) => c.json(collectableItems))
  .get('/single/:item_id', (c) => {
    const item_id = parseInt(c.req.param().item_id)
    return c.json(collectableItems[item_id])
  })
  .get('/random', async (c) => {
    // Change implimentation of weighted random selection
    // const pity = 90
    const amount = await c.req.query("amount") || "1"
    let PullAmount: number = parseInt(amount)
    const items:collectable[] = []

    const weights = [
      ["common", 553],
      ["uncommon", 298],
      ["rare", 187],
      ["super rare", 74],
      ["ultra rare", 18],
      ["legendary", 3]
    ]

    // console.log(pity, weights.flatMap(a => a[0]) )
    for (let i = 0; i < PullAmount; i++) {
      const randomRarity = weightedRandom2(weights.flatMap(a => a[0]), weights.flatMap(a => a[1]))
      const filteredByRarity = collectableItems.filter((c) => c.rarity == randomRarity?.item)
      const item = filteredByRarity[Math.floor(Math.random() * filteredByRarity.length)]
      items.push(item)
    }

    return c.json(items)
  })
  .post('/', (c) => {return c.text('TODO')}) //Add new collectable to the database

function weightedRandom2(items: any[], weights: any[]) {
  if (items.length !== weights.length) {
    throw new Error('Items and weights must be of the same size');
  }

  if (!items.length) {
    throw new Error('Items must not be empty');
  }

  // Preparing the cumulative weights array.
  // For example:
  // - weights = [1, 4, 3]
  // - cumulativeWeights = [1, 5, 8]
  const cumulativeWeights: number[] = [];
  for (let i = 0; i < weights.length; i += 1) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  // Getting the random number in a range of [0...sum(weights)]
  // For example:
  // - weights = [1, 4, 3]
  // - maxCumulativeWeight = 8
  // - range for the random number is [0...8]
  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = maxCumulativeWeight * Math.random();

  // Picking the random item based on its weight.
  // The items with higher weight will be picked more often.
  for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (cumulativeWeights[itemIndex] >= randomNumber) {
      return {
        item: items[itemIndex],
        index: itemIndex,
      };
    }
  }
}

export default collectable