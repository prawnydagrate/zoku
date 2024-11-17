<script>
	import EditableSudokuGrid from "$lib/components/EditableSudokuGrid.svelte";
	import analyzeIcon from "$lib/assets/analyze.svg";
	import { emptyGrid } from "$lib/utils.js";

	const { data } = $props();
	const { grid: gridOrig, zeroes: zeroesOrig, gridstr: gridstrOrig } = data;

	let grid = $state(gridOrig);
	let zeroes = $state(zeroesOrig);
	let gridstr = gridstrOrig;

	$effect(
		() =>
			(gridstr = grid
				.flat()
				.map((n) => n.toString())
				.join(""))
	);

	const updateGrid = (g, z) => ([grid, zeroes] = [g, z]);
</script>

<div id="grid-container">
	{#key (grid, zeroes)}<EditableSudokuGrid {grid} {zeroes} {updateGrid} />{/key}
	<div>
		<h2>Editor</h2>
		<button onclick={() => (location.href = `/analyze/${gridstr}`)}>
			<img src={analyzeIcon} alt="Analyze" /> Analyze
		</button>
		<div id="instructions">
			Select a square, and press:
			<ul>
				<li>Any digit to fill the square</li>
				<li><span class="code">Backspace</span> to clear the square</li>
				<li><span class="code">Escape</span> to unselect the square</li>
			</ul>
			The mouse pointer or the arrow keys can be used to navigate between squares. Press
			<span class="code">Shift</span>&#x2009;<span class="code">+</span>&#x2009;<span class="code"
				>X</span
			>
			or
			<span
				class="link"
				onclick={() => {
					[grid, zeroes] = emptyGrid();
					console.log(grid, zeroes);
				}}
				aria-label="Clear grid"
			>
				click here to clear the grid
			</span>.
		</div>
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=VT323&display=swap");
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
		display: flex;
		flex-direction: column;
		max-width: 40%;
	}

	@media screen and (orientation: portrait) {
		#grid-container > div {
			max-width: unset;
		}
	}

	#grid-container #instructions {
		margin-top: 2rem;
	}

	.code {
		font-weight: bold;
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

	#grid-container button > img {
		width: 26px;
		height: 26px;
	}

	/* #grid-container button > span {
		font-family: "Noto Color Emoji", sans-serif;
	} */

	#grid-container button > * {
		margin: 0 12px;
	}

	.link {
		cursor: pointer;
		color: rgb(120, 120, 224);
		font-weight: 600;
	}

	.link:hover {
		text-decoration: underline;
	}
</style>
