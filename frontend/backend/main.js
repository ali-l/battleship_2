import * as api from './apiClient'

export async function guess(grid) {
  let index = api.guess(grid)
  console.log("API Guess: ", index);
  return index
}

export async function generateGrid() {
  return api.generateGrid()
}