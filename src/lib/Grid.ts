import Square, { Status } from './Square'
import Ship from "./Ship"

export const length = 10

const defaultShips = [
  new Ship(2, 1, "Destroyer", []),
  new Ship(3, 2, "Cruiser", []),
  new Ship(3, 3, "Submarine", []),
  new Ship(4, 4, "Battleship", []),
  new Ship(5, 5, "Aircraft Carrier", []),
]

export default class Grid {
  squares: Array<Square>

  static generate(): Grid {
    let squares = []
    for (let i = 0; i < length ** 2; i++) {
      squares.push(new Square(i))
    }

    let grid = new Grid(squares)

    defaultShips.forEach(ship => grid.place(ship.size, ship.name, ship.id))

    return grid
  }

  constructor(squares: Array<Square>) {
    this.squares = squares
    this.calculateProbabilities()
  }

  processGuess(index: number): Grid {
    let square = this.squares[index]
    let newSquare = new Square(square.index, square.status, square.ship)

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

  get allShipsSunk(): boolean {
    return this.aliveShips.length == 0
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
          if (horizontalShip && this.canPlaceBlind(horizontalShip)) {
            horizontalShip.squares.forEach(square => {
              this.squares[square.index].probability += 1
            })
          }

          if (verticalShip && this.canPlaceBlind(verticalShip)) {
            verticalShip.squares.forEach(square => {
              this.squares[square.index].probability += 1
            })
          }
        })
      })
  }

  private resetProbabilities() {
    this.squares.forEach(s => s.probability = 0)
  }

  get maxIndex(): number {
    return length ** 2 - 1
  }

  canPlaceBlind(ship: Ship): boolean {
    return ship
        .squares
        .every(s => s.index <= this.maxIndex) &&
      ship
        .squares
        .every(s => this.squares[s.index].unrevealed)
  }

  squaresEmpty(ship: Ship): boolean {
    return ship
      .squares
      .every(s => !this.squares[s.index].ship)
  }

  shipDead(ship: Ship | null): boolean {
    if (!ship) return false

    return !this.aliveShips.find(s => s.id == ship.id && s.alive)
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

  private place(size: number, name: string, id: number) {
    while (true) {
      let startIndex = Math.floor(Math.random() * this.squares.length)

      let ship =
        Math.floor(Math.random() * 2) ?
          Ship.horizontalShipStartingAt(startIndex, size)
          : Ship.verticalShipStartingAt(startIndex, size)

      if (ship && this.canPlaceBlind(ship) && this.squaresEmpty(ship)) {
        ship.name = name
        ship.id = id
        ship.squares = ship.squares.map(s => this.squares[s.index])
        ship.squares.forEach(s => {
          s.ship = ship
          s.status = Status.placed_ship
        })
        break
      }
    }
  }
}