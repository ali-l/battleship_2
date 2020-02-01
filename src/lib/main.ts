import Grid from './Grid'
import { guess as randomGuess } from './Random'

export function guess(grid: Grid): number {
  return randomGuess(grid)
}