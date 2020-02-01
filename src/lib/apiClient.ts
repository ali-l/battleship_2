import Grid from "./Grid"
import Square from "./Square"

const guessURL = 'process.env.GUESS_URL'
const boardURL = 'process.env.BOARD_URL'

// Returns the index of the square that was guessed
export async function guess(grid: Grid) {
  let options = {
    method: 'POST',
    mode: 'cors',
    body: buildParams({ squares: JSON.stringify(grid.squares) })
  }

  let response = await fetch(guessURL, options as RequestInit)
  return await response.text()
}

export async function generateGrid() {
  let response = await fetch(boardURL, { mode: "cors" })
  let board = await response.json()
  return board.squares as Array<Square>
}

function buildParams(params: any) {
  let searchParams = new URLSearchParams
  Object.keys(params).forEach(key => searchParams.append(key, params[key]))
  return searchParams
}