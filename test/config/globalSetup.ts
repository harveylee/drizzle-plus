import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import $ from 'picospawn'
import { rimraf } from 'rimraf'

export const TMP_DB_DIR = path.resolve(__dirname, '../../testdb')

export async function setup() {
  await mkdir(TMP_DB_DIR, { recursive: true })
  await $('pnpm -s drizzle-kit push', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '../..'),
  })
}

export async function teardown() {
  await rimraf(TMP_DB_DIR)
}
