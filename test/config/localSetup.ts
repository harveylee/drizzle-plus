import { isTable } from 'drizzle-orm'
import { join } from 'node:path'
import $ from 'picospawn'
import { db } from './client'
import { TMP_DB_DIR } from './globalSetup'
import * as schema from './schema'

// Make a copy of the master database for this test worker.
const fromPath = join(TMP_DB_DIR, 'master.db')
const toPath = join(TMP_DB_DIR, `${process.env.VITEST_WORKER_ID}.db`)
await $(`cp ${fromPath} ${toPath}`)

// Truncate all tables.
await Promise.all(
  Object.values(schema)
    .filter((relation) => isTable(relation))
    .map((table) => db.delete(table))
)
