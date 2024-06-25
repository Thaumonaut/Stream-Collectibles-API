import { Hono } from "hono";
import { db } from "../database/index.js"
import {itemsTable} from '../database/schema/collectables.js'
import type { SelectPuff } from '../database/schema/collectables.js'
import { eq, sql } from "drizzle-orm";

const collectable = new Hono()

let collectablesList:SelectPuff[];

collectable
  .get('/single/:item_id', async (c) => {
    const item_id = parseInt(c.req.param().item_id)
    const data = await db.select().from(itemsTable).where(eq(itemsTable.item_id, item_id))
    return c.json(data)
  })
  .use('/*', async (_c, next) => {
    collectablesList = await db.select().from(itemsTable).orderBy(itemsTable.rarity)
    await next()
  })
  .get('/', (c) => c.json(collectablesList))
  .get('/random', async (c) => {
    // Change implimentation of weighted random selection
    // const pity = 90
    const amount = await c.req.query("amount") || "1"
    let PullAmount: number = parseInt(amount)
    const items:SelectPuff[] = []

    // console.log(collectablesList)

    const weights = [
      ["common", 553],
      ["uncommon", 298],
      ["rare", 187],
      ["super-rare", 74],
      ["ultra-rare", 18],
      ["legendary", 3]
    ]

    // console.log(pity, weights.flatMap(a => a[0]) )
    for (let i = 0; i < PullAmount; i++) {
      const randomRarity = weightedRandom2(weights.flatMap(a => a[0]), weights.flatMap(a => a[1]))
      const filteredByRarity = collectablesList.filter((c) => c.rarity == randomRarity?.item)
      const item = filteredByRarity[Math.floor(Math.random() * filteredByRarity.length)]
      // console.log(filteredByRarity)
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