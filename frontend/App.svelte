<script>
    import { onMount } from 'svelte'
    import Board from './Board.svelte'
    import * as client from './client/main'
    import Grid from "../backend/Grid"

    let grid = new Grid([])
    let grid2 = new Grid([])

    onMount(async function () {
        let squares = await client.generateGrid()
        grid = new Grid(squares)
        grid2 = new Grid(squares)
    })

    async function guess() {
        let index = await client.guess(grid)
        grid = grid.processGuess(index)

        index = await client.localGuess(grid2)
        grid2 = grid2.processGuess(index)
    }

    function processGuess(index) {
        let square = grid[index]
        let newSquare = { ...square }
        square.ship == null ? newSquare.status = 1 : newSquare.status = 3
        grid[index] = newSquare
    }

    function processGuess2(index) {
        let square = grid2[index]
        let newSquare = { ...square }
        square.ship == null ? newSquare.status = 1 : newSquare.status = 3
        grid2[index] = newSquare
    }
</script>

<main>
    <Board grid={grid.squares}/>
    <Board grid={grid2.squares}/>

    <div class="button" on:click={guess} on:click>
        Guess
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    .button {
        cursor: pointer;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

