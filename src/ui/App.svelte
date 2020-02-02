<script>
    import { onMount } from 'svelte'
    import Board from './Board.svelte'
    import * as lib from '../lib/main'
    import Grid from "../lib/Grid"

    let playerGrid = new Grid([])
    let opponentGrid = new Grid([])

    $: gameOver = playerGrid.allShipsSunk || opponentGrid.allShipsSunk

    onMount(async function () {
        let squares = await lib.generateGrid()
        playerGrid = new Grid(squares)
        opponentGrid = new Grid(squares)
    })

    function guess(index) {
        playerGrid = playerGrid.processGuess(lib.localGuess(playerGrid))
        opponentGrid = opponentGrid.processGuess(index)
    }

    function onClick(player) {
        return function (e) {
            if (player || gameOver) return
            let index = parseInt(e.target.getAttribute('data-index'))
            guess(index)
        }
    }

    function gameOverMessage() {
        return playerGrid.allShipsSunk ? 'Opponent Wins.' : 'You Win!'
    }
</script>

<main>
    <nav>
        Battleship
    </nav>

    <div class="status">
        {gameOver ? gameOverMessage() : 'Your Turn'}
    </div>

    <Board grid={opponentGrid} onSquareClick={onClick} gameOver={gameOver}/>
    <Board grid={playerGrid} player={true} onSquareClick={onClick}/>
</main>

<style>
    main {
        text-align: center;
        max-width: 240px;
        margin: 0 auto;
        box-sizing: border-box;
        font-family: cursive;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    nav {
        font-size: 34px;
        font-weight: 700;
        padding: 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
    }

    .status {
        font-size: 22px;
        margin-bottom: 20px;
    }
</style>

