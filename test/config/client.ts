import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { join } from 'node:path'
import { TMP_DB_DIR } from './globalSetup'
import relations from './relations'
import * as schema from './schema'

const workerDbPath = join(TMP_DB_DIR, `${process.env.VITEST_WORKER_ID}.db`)

export const db = drizzle({
  client: createClient({ url: `file:${workerDbPath}` }),
  schema,
  relations,
})
