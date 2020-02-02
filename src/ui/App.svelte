<script>
    import { onMount } from 'svelte'
    import Board from './Board.svelte'
    import * as lib from '../lib/main'
    import Grid from "../lib/Grid"

    let grid = new Grid([])
    let grid2 = new Grid([])

    onMount(async function () {
        let squares = await lib.generateGrid()
        grid = new Grid(squares)
        grid2 = new Grid(squares)

        grid.calculateProbabilities()
        grid2.calculateProbabilities()
    })

    async function guess() {
        let index = await lib.guess(grid)
        grid = grid.processGuess(index)

        index = await lib.localGuess(grid2)
        grid2 = grid2.processGuess(index)

        grid.calculateProbabilities()
        grid2.calculateProbabilities()
    }
</script>

<main>
    <Board grid={grid.squares} player={true}/>
    <Board grid={grid2.squares} />

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

