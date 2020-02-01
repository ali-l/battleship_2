import * as api from './apiClient'
import * as local from '../lib/main'

export async function guess(grid) {
  console.log('Local guess 1: ', local.guess(grid))

  let index = await api.guess(grid)
  console.log("API Guess: ", index)
  return index
}

export function localGuess(grid) {
  let index = local.guess(grid)

  console.log('Local guess 2: ', index)

  return index
}

export async function generateGrid() {
  return api.generateGrid()
}