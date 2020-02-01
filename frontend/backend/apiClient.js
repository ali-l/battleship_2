const guessURL = 'process.env.GUESS_URL';
const boardURL = 'process.env.BOARD_URL';

// Returns the index of the square that was guessed
export async function guess(grid) {
  let options = {
    method: 'POST',
    mode: 'cors',
    body: buildParams({ squares: JSON.stringify(grid) })
  };

  let response = await fetch(guessURL, options);
  return await response.text();
}

export async function generateGrid() {
  let response = await fetch(boardURL, { mode: "cors" });
  let board = await response.json();
  return board.squares
}

function buildParams(params) {
  let searchParams = new URLSearchParams;
  Object.keys(params).forEach(key => searchParams.append(key, params[key]));
  return searchParams
}