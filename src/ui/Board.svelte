<script>
    export let grid
    export let player = false
    export let onSquareClick = function () {
    }
    export let gameOver = false

    let length = Math.sqrt(grid.squares.length)
</script>

<div class="container {player ? 'player' : 'opponent'} {gameOver && 'game-over'}">
    <div class="title" style="--length:{length}">
      {player ? 'Your' : 'Opponent\'s'} Board
    </div>
  {#each grid.squares as square, i}
      <div class="item"
           data-state="{square.status}"
           data-index="{square.index}"
           data-dead-ship="{grid.shipDead(square.ship)}"
           style="grid-row-start: {Math.floor(i / length) + 2}; grid-column-start: { i % length + 1}"
           on:click={onSquareClick(player)}>
      </div>
  {/each}
</div>

<style>
    .container {
        display: inline-grid;
        justify-items: center;
        align-items: center;
        margin: 10px 60px 30px;
    }

    .title {
        grid-column: span var(--length);
        grid-row: 1;

        margin-bottom: 10px;
        font-weight: 700;
        font-size: 20px;
    }

    .item {
        border: 1px solid darkgray;
        justify-self: stretch;
        align-self: stretch;

        height: 60px;
        width: 60px;
    }

    @media (max-width: 1500px) {
        .item {
            height: 50px;
            width: 50px;
        }

        .container {
            margin: 10px 30px 30px;
        }
    }

    @media (max-width: 550px) {
        .item {
            height: 35px;
            width: 35px;
        }

        .container {
            margin: 0 auto 30px;
        }
    }

    .item[data-state = '0'] {
        background-color: skyblue;
    }

    .item[data-state = '3'] {
        background-color: lightcoral;
    }

    .item[data-dead-ship = 'true'] {
        background-color: grey;
    }

    .player > .item[data-state = '4'] {
        background-color: black;
    }

    .opponent > .item[data-state = '4'] {
        background-color: skyblue;
    }

    .opponent:not(.game-over) > .item[data-state = '4']:hover, .opponent:not(.game-over) > .item[data-state = '0']:hover {
        background-color: #c9e9f6;
        cursor: pointer;
    }
</style>
