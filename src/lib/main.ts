import Grid from './Grid'
import { guess as randomGuess } from './probability'
import { guess as proximityGuess } from './proximity'
import * as api from './apiClient'
import Square from "./Square"

export async function guess(grid: Grid): Promise<number> {
  let index = await api.guess(grid)
  return Number.parseInt(index)
}

export function localGuess(grid: Grid): number {
  return selectGuesser(grid)()
}

function selectGuesser(grid: Grid): () => number {
  let guesser = grid.partiallyHitShips.length > 0 ? proximityGuess : randomGuess
  return () => guesser(grid)
}

export async function generateGrid(): Promise<Array<Square>> {
  return api.generateGrid()
}