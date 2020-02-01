<script>
    import { onMount } from 'svelte'
    import Board from './Board.svelte'
    import * as client from './client/main'

    let grid

    onMount(async function () {
        grid = await client.generateGrid()
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
    <Board grid={grid}/>
    <div class="button" on:click={guess}>
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

