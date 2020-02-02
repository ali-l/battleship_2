import Grid from "./Grid"
import Ship from "./Ship"

export function guess(grid: Grid): number {
  let ship = grid.partiallyHitShips[0]

  return selectGuesser(ship)(grid)
}

function selectGuesser(ship: Ship): (grid: Grid) => number {
  let guesser = ship.numHits > 1 ? directedGuess : vicinityGuess
  return (grid: Grid) => guesser(ship, grid)
}

function directedGuess(ship: Ship, grid: Grid): number {
  let sameRow = ship.hitSquares[0].row == ship.hitSquares[1].row

  if (sameRow) {
    let square = ship.hitSquares.filter(s => s.unrevealedNeighboursInSameRow(grid).length > 0)[0]
    return square.unrevealedNeighboursInSameRow(grid)[0].index
  } else {
    let square = ship.hitSquares.filter(s => s.unrevealedNeighboursInSameColumn(grid).length > 0)[0]
    return square.unrevealedNeighboursInSameColumn(grid)[0].index
  }
}

function vicinityGuess(ship: Ship, grid: Grid): number {
  return ship.hitSquares[0]
    .unrevealedNeighbourSquares(grid)
    .run(a => a[0].index)
}

