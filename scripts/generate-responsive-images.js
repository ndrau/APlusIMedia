#!/usr/bin/env node
/*
  Generate responsive WebP variants for portfolio images.
  Input: public/images/portfolio/*.(png|jpg|jpeg)
  Output: public/images/portfolio/<name>-<width>.webp for widths [480, 960, 1440, 1920]
*/
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const INPUT_DIR = path.resolve(__dirname, '..', 'public', 'images', 'portfolio')
const OUTPUT_DIR = INPUT_DIR
const TARGET_WIDTHS = [480, 960, 1440, 1920]

async function generateVariantsForFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const base = path.basename(filePath, ext)
  const input = filePath

  for (const width of TARGET_WIDTHS) {
    const out = path.join(OUTPUT_DIR, `${base}-${width}.webp`)
    if (fs.existsSync(out)) continue
    await sharp(input)
      .resize({ width, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out)
    console.log(`Generated: ${out}`)
  }
}

async function run() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`Input directory does not exist: ${INPUT_DIR}`)
    process.exit(1)
  }
  const files = fs
    .readdirSync(INPUT_DIR)
    .filter((f) => f.match(/\.(png|jpg|jpeg)$/i))
    .map((f) => path.join(INPUT_DIR, f))

  for (const file of files) {
    try {
      await generateVariantsForFile(file)
    } catch (err) {
      console.error(`Failed processing ${file}:`, err)
    }
  }
}

run()

