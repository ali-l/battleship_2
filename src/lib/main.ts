import Grid from './Grid'
import { guess as randomGuess } from './probability'
import { guess as proximityGuess } from './proximity'

export function guess(grid: Grid): number {
  return selectGuesser(grid)()
}

function selectGuesser(grid: Grid): () => number {
  let guesser = grid.partiallyHitShips.length > 0 ? proximityGuess : randomGuess
  return () => guesser(grid)
}