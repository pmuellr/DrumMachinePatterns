#!/usr/bin/env node

'use strict'

const dm200 = require('../Sources/DrumMachinePatterns200/Patterns.json')
const dm260 = require('../Sources/DrumMachinePatterns260/Patterns.json')

const patterns = []

for (const pattern of dm200) patterns.push({ ...pattern, book: 'dm200' })
for (const pattern of dm260) patterns.push({ ...pattern, book: 'dm260' })

for (const pattern of patterns) {
  const { title, book, signature, length, accent } = pattern
  let { tracks } = pattern

  console.log(`# ${book} - ${title}`)
  console.log(`\nsignature: ${signature}`)

  console.log('')
  console.log('| track | ① ② ③ ④| ⑤ ⑥ ⑦ ⑧ | ⑨ ⑩ ➊ ➋ | ➌ ➍ ➎ ➏ |')
  //console.log('| track | 1 2 3 4 | 5 6 7 8 | 9 10 11 12 | 13 14 15 16 |')
  console.log('| ----- | --- | --- | --- | --- |')

  if (accent != null) {
    tracks = { accent, ...tracks }
  }

  const trackNames = Object.keys(tracks)

  for (const trackName of trackNames) {
    let line = `| ${trackName} | `
    for (let step = 0; step < length; step++) {
      const val = getStepChar(tracks[trackName][step])
      if (step % 4 === 0 && step < length - 1) line = `${line} <tt>`
      line = `${line} ${val}`
      if (step % 4 === 3) line = `${line} </tt> |`
    }
    console.log(line)
  }

  console.log('')  
}

function getStepChar(val) {
  if (val === 'Rest') return '.'
  if (val === 'Note') return '**X**'
  if (val === 'Accent') return '**^**'
  if (val === 'Flam') return '**F**'

  if (val === 'Rest') return '・'
  if (val === 'Rest') return ' '
  if (val === 'Note') return '◉'
  if (val === 'Accent') return '⬆︎'

  console.log(`unknown step value: "${val}"`)
  return '?'
}