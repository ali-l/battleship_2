import Grid from "./Grid"
import { Status } from "./Square"

export function guess(grid: Grid): number {
  return grid
    .filter(square => square.status != Status.miss)
    .run(squares => pickIndex(squares))
}

function pickIndex(array: Array<any>): number {
  return Math.floor(Math.random() * array.length)
}

declare global {
  interface Array<T> {
    run<T, R>(block: (arg: Array<T>) => R): R
  }
}

Array.prototype.run = function run<T, R>(block: (arg: Array<T>) => R): R {
  return block(this)
}