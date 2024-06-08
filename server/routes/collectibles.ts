import { Hono } from "hono";

const collectible = new Hono()

collectible
  .get('/', (c) => c.json({'TODO': "This feature is still being made."}))
  .get('/:item_id', (c) => {
    const { item_id } = c.req.param()
    return c.json({"Result":`You have selected collectible item #${item_id}`})
  })
  .post('/', (c) => {return c.text('TODO')}) //Add new collectible to the database

export default collectible