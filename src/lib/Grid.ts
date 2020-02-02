import Square, { Status } from './Square'
import Ship from "./Ship"

export const length = 10

export default class Grid {
  squares: Array<Square>

  constructor(squares: Array<Square>) {
    this.squares = squares.map(s => Square.fromJSON(s))
  }

  processGuess(index: number): Grid {
    let square = this.squares[index]
    let newSquare = Square.fromJSON({ ...square })

    square.ship == null ? newSquare.status = Status.miss : newSquare.status = Status.hit

    this.squares[index] = newSquare
    return new Grid([...this.squares])
  }

  get partiallyHitShips(): Array<Ship> {
    return this.ships.filter(s => s.partiallyHit)
  }

  private get ships(): Array<Ship> {
    let oShips = this.squares.reduce((obj, square) => {
      if (!square.ship) return obj

      let entry = obj.get(square.ship.id)
      if (entry) {
        entry.push(square)
      } else {
        obj.set(square.ship.id, [square])
      }

      return obj
    }, new Map<number, Array<Square>>())

    let ships: Array<Ship> = []

    oShips.forEach((squares) => {
      let sShip = squares[0].ship
      // @ts-ignore
      ships.push(new Ship(sShip.size, sShip.id, sShip.name, squares))
    })

    return ships
  }
}