import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { join } from 'node:path'
import { TMP_DB_DIR } from './test/config/globalSetup'

const masterDbPath = join(TMP_DB_DIR, 'master.db')

export default defineConfig({
  out: './drizzle',
  schema: './test/config/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: `file:${masterDbPath}`,
  },
})
