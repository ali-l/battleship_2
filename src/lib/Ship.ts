import Square, { Status } from "./Square"

export default class Ship {
  size: number
  id: number
  name: string
  squares: Array<Square>

  static horizontalShipStartingAt(index: number, size: number): Ship | null {
    let squares = []

    for (let i = 0; i < size; i++) {
      let square = new Square(null, Status.untouched, index + i)
      if (square.endOfRow && i != size - 1) {
        return null
      }

      squares.push(square)
    }

    return new Ship(size, 0, "", squares)
  }

  static verticalShipStartingAt(index: number, size: number): Ship | null {
    let squares = []

    for (let i = 0; i < size; i++) {
      let square = new Square(null, Status.untouched, index + i * 10)
      if (square.endOfColumn && i != size - 1) {
        return null
      }

      squares.push(square)
    }

    return new Ship(size, 0, "", squares)
  }

  constructor(size: number, id: number, name: string, squares: Array<Square>) {
    this.size = size
    this.id = id
    this.name = name
    this.squares = squares
  }

  get alive(): boolean {
    return this.hitSquares.length < this.size
  }

  get partiallyHit(): boolean {
    return this.alive && this.hitSquares.length > 0
  }

  get numHits(): number {
    return this.hitSquares.length
  }

  get hitSquares(): Array<Square> {
    return this.squares.filter(s => s.status == Status.hit)
  }
}