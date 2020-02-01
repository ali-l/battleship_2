<script>
    import { onMount } from 'svelte'
    import * as client from './client/main'

    let grid = [];

    onMount(async function () {
        grid = await client.generateGrid();
        length = Math.sqrt(grid.length)
    });

    async function guess() {
        let index = await client.guess(grid);
        processGuess(index)
    }

    function processGuess(index) {
        let square = grid[index];
        let newSquare = { ...square };
        square.ship == null ? newSquare.status = 1 : newSquare.status = 3;
        grid[index] = newSquare
    }
</script>

<div class="container" style="--length:{length}">
    {#each grid as square, i}
        <div class="item" data-test="works" data-state="{square.status}"
             style="grid-row-start: {Math.floor(i / length) + 1}; grid-column-start: { i % length + 1}">
        </div>
    {/each}
</div>

<div on:click={guess}>
    Guess
</div>

<style>
    .container {
        display: inline-grid;
        justify-items: center;
        align-items: center;

        grid-template-columns: repeat(--length, 1fr);
        grid-template-rows: repeat(--length, 1fr);
        height: 700px;
        width: 700px;
    }

    .item {
        border: 1px solid darkgray;
        justify-self: stretch;
        align-self: stretch;
    }

    .item[data-state = '0'] {
        background-color: skyblue;
    }

    .item[data-state = '0']:hover {
        background-color: #c9e9f6;
        cursor: pointer;
    }

    .item[data-state = '4'] {
        background-color: black;
    }

    .item[data-state = '3'] {
        background-color: lightcoral;
    }
</style>