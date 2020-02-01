<script>
    import { onMount } from 'svelte'
    import Board from './Board.svelte'
    import * as client from './client/main'

    let grid = []
    let length

    onMount(async function () {
        grid = await client.generateGrid()
        length = Math.sqrt(grid.length)
    })

    async function guess() {
        let index = await client.guess(grid)
        processGuess(index)
    }

    function processGuess(index) {
        let square = grid[index]
        let newSquare = { ...square }
        square.ship == null ? newSquare.status = 1 : newSquare.status = 3
        grid[index] = newSquare
    }
</script>

<main>
    <Board grid={grid} length={length}/>
    <div on:click={guess}>
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

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

