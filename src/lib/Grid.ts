import Square, { Status } from './Square'
import Ship from "./Ship"

export const length = 10

export default class Grid {
  squares: Array<Square>

  constructor(squares: Array<Square>) {
    this.squares = squares.map(s => Square.fromJSON(s))
    this.calculateProbabilities()
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

  get aliveShips(): Array<Ship> {
    return this.ships.filter(s => s.alive)
  }

  get unrevealedSquares(): Array<Square> {
    return this
      .squares
      .filter(s => s.unrevealed)
  }

  get highestProbabilityUnrevealedSquare(): Square {
    return this
      .unrevealedSquares
      .sort((a, b) => b.probability - a.probability)[0]
  }

  calculateProbabilities() {
    this.resetProbabilities()

    this
      .aliveShips
      .forEach(ship => {
        this.unrevealedSquares.forEach(square => {
          let horizontalShip = Ship.horizontalShipStartingAt(square.index, ship.size)
          let verticalShip = Ship.verticalShipStartingAt(square.index, ship.size)
          if (horizontalShip && this.canPlace(horizontalShip)) {
            horizontalShip.squares.forEach(square => {
              this.squares[square.index].probability += 1
            })
          } else {
            // console.log('cant place', ship, ' at', square.index)
          }

          if (verticalShip && this.canPlace(verticalShip)) {
            verticalShip.squares.forEach(square => {
              this.squares[square.index].probability += 1
            })
          } else {
            // console.log('cant place', ship, ' at', square)
          }
        })
      })

    console.log('highest probability: ', this.highestProbabilityUnrevealedSquare)
  }

  private resetProbabilities() {
    this.squares.forEach(s => s.probability = 0)
  }

  get maxIndex(): number {
    return length ** 2 - 1
  }

  canPlace(ship: Ship): boolean {
    return ship
        .squares
        .every(s => s.index <= this.maxIndex) &&
      ship
        .squares
        .every(s => this.squares[s.index].unrevealed)
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