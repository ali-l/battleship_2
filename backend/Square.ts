import Ship from "./Ship"

export enum Status {
  untouched = 0,
  miss = 1,
  hit = 3,
  placed_ship = 4
}

export default class Square {
  status: Status
  ship: Ship | null

  constructor(ship: Ship, status: number) {
    // @ts-ignore
    this.status = Status[Status[status]]
    this.ship = ship
  }
}