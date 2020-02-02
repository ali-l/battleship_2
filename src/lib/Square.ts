import Ship from "./Ship"
import Grid, { length } from './Grid'

export enum Status {
  untouched = 0,
  miss = 1,
  hit = 3,
  placed_ship = 4
}

type SquareJSON = {
  status: Status,
  ship: Ship | null,
  index: number
}

export default class Square {
  status: Status
  ship: Ship | null
  index: number

  static fromJSON(squareJson: SquareJSON): Square {
    let ship = squareJson.ship
    ship = ship ? new Ship(ship.size, ship.id, ship.name, ship.squares) : null
    return new Square(ship, squareJson.status, squareJson.index)
  }

  constructor(ship: Ship | null, status: number, index: number) {
    // @ts-ignore
    this.status = Status[Status[status]]
    this.ship = ship
    this.index = index
  }

  get neighbourIndexes(): Array<number> {
    let indexes = []

    !this.beginningOfRow && indexes.push(this.index - 1)
    !this.beginningOfColumn && indexes.push(this.index - 10)
    !this.endOfRow && indexes.push(this.index + 1)
    !this.endOfColumn && indexes.push(this.index + 10)

    return indexes
  }

  neighbourSquares(grid: Grid): Array<Square> {
    return this
      .neighbourIndexes
      .map(i => grid.squares[i])
  }

  unrevealedNeighbourSquares(grid: Grid): Array<Square> {
    return this
      .neighbourSquares(grid)
      .filter(s => s.unrevealed)
  }

  unrevealedNeighboursInSameRow(grid: Grid): Array<Square> {
    return this
      .unrevealedNeighbourSquares(grid)
      .filter(s => s.row == this.row)
  }

  unrevealedNeighboursInSameColumn(grid: Grid): Array<Square> {
    return this
      .unrevealedNeighbourSquares(grid)
      .filter(s => s.column == this.column)
  }

  get unrevealed(): boolean {
    return this.status != Status.hit && this.status != Status.miss
  }

  get beginningOfRow(): boolean {
    return this.column == 0
  }

  get endOfRow(): boolean {
    return this.column == length - 1
  }

  get beginningOfColumn(): boolean {
    return this.row == 0
  }

  get endOfColumn(): boolean {
    return this.row == length - 1
  }

  get row(): number {
    return Math.floor(this.index / length)
  }

  get column(): number {
    return this.index % length
  }
}