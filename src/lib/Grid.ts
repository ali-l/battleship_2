import Square, { Status } from './Square'

export default class Grid {
  squares: Array<Square>

  constructor(squares: Array<Square>) {
    this.squares = [...squares]
  }

  processGuess(index: number): Grid {
    let square = this.squares[index]
    let newSquare = { ...square }

    square.ship == null ? newSquare.status = Status.miss : newSquare.status = Status.hit

    this.squares[index] = newSquare
    return new Grid([...this.squares])
  }
}