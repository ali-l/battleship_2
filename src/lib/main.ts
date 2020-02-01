import Grid from './Grid'
import { guess as randomGuess } from './Random'
import * as api from './apiClient'
import Square from "./Square"

export async function guess(grid: Grid): Promise<number> {
  localGuess(grid)

  let index = await api.guess(grid)
  console.log("API Guess: ", index)
  return Number.parseInt(index)
}

export function localGuess(grid: Grid): number {
  let index = randomGuess(grid)

  console.log('Local guess: ', index)

  return index
}

export async function generateGrid(): Promise<Array<Square>> {
  return api.generateGrid()
}