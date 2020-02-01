import Square from "./Square"

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
}