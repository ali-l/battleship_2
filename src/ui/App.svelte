<script>
    import { onMount } from 'svelte'
    import Board from './Board.svelte'
    import * as lib from '../lib/main'
    import Grid from "../lib/Grid"

    let playerGrid
    let opponentGrid
    resetBoards()

    $: gameOver = playerGrid.allShipsSunk || opponentGrid.allShipsSunk

    onMount(resetBoards)

    function guess(index) {
        playerGrid = playerGrid.processGuess(lib.guess(playerGrid))
        opponentGrid = opponentGrid.processGuess(index)
    }

    function onClick(e) {
        let index = parseInt(e.target.getAttribute('data-index'))
        if (gameOver || !opponentGrid.squares[index].unrevealed) return
        guess(index)
    }

    function gameOverMessage() {
        return playerGrid.allShipsSunk ? 'Opponent Wins.' : 'You Win!'
    }

    async function resetBoards() {
        playerGrid = Grid.generate()
        opponentGrid = Grid.generate()
    }
</script>

<main>
    <nav>
        Battleship
    </nav>

    <div class="status">
      {#if gameOver}
        { gameOverMessage() }
          <a on:click={resetBoards}>Play again?</a>
      {:else}
          Your Turn
      {/if}
    </div>

    <Board grid={opponentGrid} onSquareClick={onClick} clickable={!gameOver}/>
    <Board grid={playerGrid} player={true}/>
</main>

<style>
    main {
        text-align: center;
        margin: 0 auto;
        box-sizing: border-box;
        font-family: cursive;
    }

    a {
        color: #337ab7;
        text-decoration: none;
        cursor: pointer;
    }

    a:hover, a:focus {
        color: black;
        text-decoration: underline;
        transition: all linear 0.2s;
    }

    nav {
        font-size: 36px;
        font-weight: 700;
        padding: 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
    }

    .status {
        font-size: 24px;
        margin-bottom: 20px;
    }
</style>

