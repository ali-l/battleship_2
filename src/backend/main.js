import * as api from './apiClient'

export async function guess(grid) {
  return api.guess(grid)
}

export async function generateGrid() {
  return api.generateGrid()
}