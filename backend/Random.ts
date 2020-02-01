import Grid from "./Grid"
import Square, { Status } from "./Square"

export function guess(grid: Grid): number {
  return grid.squares
    .filter(square => square.status != Status.miss)
    .run(squares => pickIndex(squares))
}

function pickIndex(squares: Array<Square>): number {
  let square = squares[Math.floor(Math.random() * squares.length)]
  return square.index
}

declare global {
  interface Array<T> {
    run<T, R>(this: Array<T>, block: (arg: Array<T>) => R): R
  }
}

Array.prototype.run = function run<T, R>(this: Array<T>, block: (arg: Array<T>) => R): R {
  return block(this)
}