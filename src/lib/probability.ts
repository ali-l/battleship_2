import Grid from "./Grid"
import "./Array"

export function guess(grid: Grid): number {
  return grid.squares
    .also(_ => grid.calculateProbabilities())
    .run(_ => grid.highestProbabilityUnrevealedSquare.index)
}
