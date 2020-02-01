import Square from './Square'

export default class Grid {
  squares: Array<Square>

  constructor(squares: Array<Square>) {
    this.squares = [...squares]
  }

  processGuess(index: number): Grid {
    let square = this.squares[index]
    let newSquare = { ...square }

    square.ship == null ? newSquare.status = 1 : newSquare.status = 3

    this.squares[index] = newSquare
    return new Grid([...this.squares])
  }
}