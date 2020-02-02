import Square, { Status } from "./Square"

export default class Ship {
  size: number
  id: number
  name: string
  squares: Array<Square>

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