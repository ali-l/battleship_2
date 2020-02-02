<script>
    export let grid = []
    export let player = false
    export let onSquareClick = function(){}
    $: length = Math.sqrt(grid.length)
</script>

<div class="container {player ? 'player' : 'opponent'}" style="--length:{length}">
    {#each grid as square, i}
        <div class="item" data-state="{square.status}" data-index="{square.index}"
             style="grid-row-start: {Math.floor(i / length) + 1}; grid-column-start: { i % length + 1}"
             on:click={onSquareClick(player)}>
            {square.index}, { square.probability }
        </div>
    {/each}
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

    .item[data-state = '3'] {
        background-color: lightcoral;
    }

    .player > .item[data-state = '4'] {
        background-color: black;
    }

    .opponent > .item[data-state = '4'] {
        background-color: skyblue;
    }

    .opponent > .item[data-state = '4']:hover, .opponent > .item[data-state = '0']:hover  {
        background-color: #c9e9f6;
        cursor: pointer;
    }
</style>