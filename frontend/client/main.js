import * as api from './apiClient'
import * as local from '../../backend/main.ts'

export async function guess(grid) {
  console.log('Local Guess: ', local.hello());

  let index = await api.guess(grid);
  console.log("API Guess: ", index);
  return index
}

export async function generateGrid() {
  return api.generateGrid()
}