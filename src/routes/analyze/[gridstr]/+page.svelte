<script>
	import { rerenderTime, solveSudoku, solveSudokuDetailed } from "$lib/utils.js";
	import SudokuGrid from "$lib/components/SudokuGrid.svelte";
	import editIcon from "$lib/assets/edit.svg";
	import solveIcon from "$lib/assets/solve.svg";
	import revertIcon from "$lib/assets/revert.svg";

	const { data } = $props();
	const { grid: gridOrig, zeroes, gridstr: gridstrOrig } = data;
	let grid = $state(gridOrig);
	let detailed = $state(false);
	let solving = $state(false);
	let solved = $state(undefined);

	let gridstr = gridstrOrig;
	const updateGridstr = (grid) =>
		(gridstr = grid
			.flat()
			.map((n) => n.toString())
			.join(""));

	const solve = async () => {
		solving = true;
		await rerenderTime();
		const start = Date.now();
		const sol = solveSudoku([...grid.map((row) => [...row])], 0, 0);
		const end = Date.now();
		solving = false;
		if (sol == null) {
			solved = -1;
			return;
		}
		solved = end - start;
		grid = sol;
	};

	const solveDetailed = async () => {
		solving = true;
		const start = Date.now();
		const sol = await solveSudokuDetailed(grid, 0, 0, (g) => (grid = g));
		const end = Date.now();
		solving = false;
		if (sol == null) {
			solved = -1;
			return;
		}
		solved = end - start;
		grid = sol;
	};

	const resetSol = () => {
		for (let [y, x] of zeroes) {
			grid[y][x] = 0;
			solved = undefined;
		}
	};
</script>

<div id="grid-container">
	{#key grid}
		<SudokuGrid {grid} {zeroes} {updateGridstr} />
	{/key}
	<div class="col">
		<h2>Analysis</h2>
		{#key solving}
			<button onclick={() => (location.href = `/edit/${gridstr}`)} disabled={solving}>
				<img src={editIcon} alt="Edit" />Edit
			</button>
			<div class="row">
				<input id="detailed" type="checkbox" bind:checked={detailed} disabled={solving} />
				<label for="detailed">Show steps (slow)</label>
			</div>
			<button onclick={!solved ? (detailed ? solveDetailed : solve) : () => {}} disabled={solving}>
				<img src={solveIcon} alt="Solve" />
				{solving ? "Solving..." : "Solve"}
			</button>
		{/key}
		{#if solved >= 0}
			<div class="done">
				<div>Solved in <span class="code">{(solved - (solved % 10)) / 1000}s</span>.</div>
				<button onclick={resetSol}><img src={revertIcon} alt="Revert" />Revert</button>
			</div>
		{:else if solved < 0}
			<span> This sudoku has no valid solutions. Edit the grid to try a different one. </span>
		{/if}
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Ubuntu+Sans+Mono:ital,wght@0,400..700;1,400..700&family=Ubuntu+Sans:ital,wght@0,100..800;1,100..800&family=VT323&display=swap");
	/* @import url("https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=VT323&display=swap"); */

	#grid-container {
		display: flex;
		font-family: "Courier New", monospace;
	}

	@media screen and (orientation: portrait) {
		#grid-container {
			flex-direction: column;
			margin-bottom: 2rem;
		}
	}

	#grid-container > div {
		max-width: 40%;
	}

	@media screen and (orientation: portrait) {
		#grid-container > div {
			max-width: unset;
		}
	}

	#grid-container .col,
	#grid-container .done {
		display: flex;
		flex-direction: column;
	}

	#grid-container .row {
		display: flex;
	}

	#grid-container .row > * {
		margin: 1rem 4px 4px 4px;
	}

	#grid-container .row > #detailed {
		width: 16px;
		outline: 1px solid #fafafa;
		border-radius: 4px;
	}

	#grid-container span {
		margin-top: 3rem;
	}

	#grid-container h2 {
		font-family: "VT323", monospace;
		font-size: 24pt;
	}

	#grid-container button {
		max-height: 44px;
		max-width: 164px;
		border: 1px solid #666;
		border-radius: 32px;
		background-color: #dfffdf;
		padding: 12px 18px;
		margin: 2px;
		font-family: "Courier New", monospace;
		font-size: 12pt;
		display: flex;
		align-items: center;
		justify-content: center;
		transition-duration: 200ms;
	}

	#grid-container button:hover {
		background-color: #ccffcc;
	}

	#grid-container button:disabled {
		background-color: #efefef;
	}

	#grid-container button:disabled img {
		filter: invert(100%) brightness(66%);
	}

	#grid-container button > img {
		width: 18px;
		height: 18px;
	}

	/* #grid-container button > span {
		font-family: "Noto Color Emoji", sans-serif;
	} */

	#grid-container button > * {
		margin: 0 12px;
	}

	#grid-container .done {
		margin-top: 1rem;
	}

	.code {
		font-weight: bold;
	}
</style>
