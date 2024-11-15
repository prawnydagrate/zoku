<script>
	import { onMount } from "svelte";

	const { grid: gridOrig, zeroes: zeroesOrig, updateGridstr } = $props();
	let grid = $state(gridOrig);
	let zeroes = $state(zeroesOrig);

	$effect(() => updateGridstr(grid));

	let selected = $state(null);
	const isSelected = (y, x) => selected != null && selected[0] == y && selected[1] == x;

	const getZeroIndex = (y, x) => {
		let zindex = -1;
		for (let i = 0; i < zeroes.length; i++) {
			const [zy, zx] = zeroes[i];
			if (zy == y && zx == x) {
				zindex = i;
				break;
			}
		}
		return zindex;
	};

	onMount(
		() =>
			(document.onkeyup = (e) => {
				if (e == null) return;
				const { key, keyCode } = e;
				// clear grid
				if (key === "X") {
					const newGrid = [];
					for (let _ = 0; _ < 9; _++) {
						newGrid.push(Array(9).fill(0));
					}
					grid = newGrid;
					const newZeroes = [];
					for (let y = 0; y < 9; y++) {
						for (let x = 0; x < 9; x++) {
							newZeroes.push([y, x]);
						}
					}
					zeroes = newZeroes;
					return;
				}
				if (selected == null) return;
				let [y, x] = selected;
				// unselect
				if (key === "Escape") {
					selected = null;
					return;
				}
				// navigation
				if (key === "ArrowDown") {
					if (++y === 9) {
						y = 0;
					}
					selected = [y, x];
					return;
				} else if (key === "ArrowLeft") {
					if (--x === -1) {
						x = 8;
					}
					selected = [y, x];
					return;
				} else if (key === "ArrowRight") {
					if (++x === 9) {
						x = 0;
					}
					selected = [y, x];
					return;
				} else if (key === "ArrowUp") {
					if (--y === -1) {
						y = 8;
					}
					selected = [y, x];
					return;
				}
				// clear square
				if (["Backspace", "Delete"].includes(key)) {
					grid[y][x] = 0;
					if (getZeroIndex(y, x) === -1) {
						zeroes.push([y, x]);
					}
					return;
				}
				if (!Array.from("0123456789").includes(key)) return;
				// fill square
				const n = parseInt(key);
				grid[y][x] = n;
				const zindex = getZeroIndex(y, x);
				if (zindex !== -1) {
					zeroes.splice(zindex, 1);
				}
			})
	);
</script>

<table id="grid">
	<tbody>
		{#each grid as row, y}
			<tr>
				{#each row as cell, x}
					<td
						class="row-{y} col-{x}{isSelected(y, x) ? ' selected' : ''}"
						onclick={() => (selected = isSelected(y, x) ? null : [y, x])}
					>
						{#if cell != 0}
							{#if zeroes.find(([f, s]) => f == y && s == x) != null}
								<strong>{cell}</strong>
							{:else}
								{cell}
							{/if}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table#grid {
		border-collapse: collapse;
		margin: 0 1rem 1rem 0;
	}

	table#grid td {
		border: 1px solid black;
		width: 56px;
		height: 56px;
		text-align: center;
		font-family: "Courier New", monospace;
		font-size: 24pt;
		background-color: #e0ffff; /* equiv to lightcyan */
		color: #333;
		transition-duration: 200ms;
	}

	table#grid td:hover {
		background-color: #ffffef;
	}

	table#grid td.row-2,
	table#grid td.row-5 {
		border-bottom-width: 2px;
	}

	table#grid td.row-3,
	table#grid td.row-6 {
		border-top-width: 2px;
	}

	table#grid td.col-2,
	table#grid td.col-5 {
		border-right-width: 2px;
	}

	table#grid td.col-3,
	table#grid td.col-6 {
		border-left-width: 2px;
	}

	table#grid td.row-0 {
		border-top-width: 3px;
	}

	table#grid td.col-0 {
		border-left-width: 3px;
	}

	table#grid td.row-8 {
		border-bottom-width: 3px;
	}

	table#grid td.col-8 {
		border-right-width: 3px;
	}

	table#grid td.selected {
		background-color: #ffffbb;
	}
</style>
