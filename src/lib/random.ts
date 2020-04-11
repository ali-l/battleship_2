import Grid from "./Grid"
import Square, { Status } from "./Square"

export function guess(grid: Grid): number {
  return grid.squares
    .filter(square => square.status != Status.miss && square.status != Status.hit)
    .run(squares => pickIndex(squares))
}

function pickIndex(squares: Array<Square>): number {
  let square = squares[Math.floor(Math.random() * squares.length)]
  return square.index
}
