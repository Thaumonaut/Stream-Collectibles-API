import { pgTable, pgEnum, text, serial } from 'drizzle-orm/pg-core'

export const rarityEnum = pgEnum('rarity', [
  'common',
  'uncommon',
  'rare',
  'super-rare',
  'ultra-rare',
  'legendary',
])

export const itemsTable = pgTable('items', {
  item_id: serial('item_id').primaryKey(),
  item_name: text('item_name').notNull(),
  item_img: text('item_img'),
  rarity: rarityEnum('rarity').notNull(),
});


export type InsertPuff = typeof itemsTable.$inferInsert;
export type SelectPuff = typeof itemsTable.$inferSelect;