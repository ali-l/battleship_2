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
</script>

<main>
    <Board grid={playerGrid.squares} player={true} onSquareClick={onClick}/>
    <Board grid={opponentGrid.squares} onSquareClick={onClick} gameOver={gameOver}/>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

