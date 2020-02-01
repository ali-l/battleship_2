<script>
    export let grid = [];
    $: length = Math.sqrt(grid.length);
</script>

<div class="container" style="--length:{length}">
    {#each grid as square, i}
        <div class="item" data-state="{square.status}"
             style="grid-row-start: {Math.floor(i / length) + 1}; grid-column-start: { i % length + 1}">
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