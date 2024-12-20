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
			Select a cell, and press:
			<ul>
				<li>Any digit to fill the cell</li>
				<li><span class="code">Backspace</span> to clear the cell</li>
				<li><span class="code">Escape</span> to unselect the cell</li>
			</ul>
			The mouse pointer or the arrow keys can be used to navigate between cells. Press
			<span class="code">Shift</span>&#x2009;<span class="code">+</span>&#x2009;<span class="code"
				>X</span
			>
			or
			<span
				class="link"
				onclick={() => {
					[grid, zeroes] = emptyGrid();
				}}
				aria-label="Clear grid"
			>
				click here to clear the grid
			</span>.
		</div>
	</div>
</div>

<style>
	#grid-container {
		display: flex;

		font-family: "Courier New", monospace;
	}

	#grid-container > div {
		display: flex;
		flex-direction: column;

		max-width: 40%;
	}

	@media screen and (orientation: portrait) {
		#grid-container {
			flex-direction: column;

			margin-bottom: 2rem;
		}

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
		display: flex;
		align-items: center;
		justify-content: center;

		max-height: 44px;
		max-width: 164px;
		padding: 12px 18px;
		margin: 2px;

		border: 1px solid #666;
		border-radius: 32px;
		background-color: #dfffdf;

		font-family: "Courier New", monospace;
		font-size: 12pt;

		transition-duration: 200ms;
	}

	#grid-container button:hover {
		background-color: #ccffcc;
	}

	#grid-container button > img {
		width: 26px;
		height: 26px;
	}
	#grid-container button > * {
		margin: 0 12px;
	}

	.link {
		font-weight: 600;
		color: rgb(120, 120, 224);

		cursor: pointer;
	}

	.link:hover {
		text-decoration: underline;
	}
</style>
