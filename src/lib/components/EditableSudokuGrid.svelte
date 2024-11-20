<script>
	import { emptyGrid } from "$lib/utils";
	import { onMount } from "svelte";

	const { grid: gridOrig, zeroes: zeroesOrig, updateGrid } = $props();
	let grid = $state(gridOrig);
	let zeroes = $state(zeroesOrig);

	$effect(() => updateGrid(grid, zeroes));

	// to show the keyboard on mobile devices
	let invisibleInput;
	onMount(() => {
		invisibleInput = document.createElement("input");
		document.body.appendChild(invisibleInput);
		invisibleInput.id = "invisible-input";
		invisibleInput.type = "number";
		invisibleInput.style.opacity = 0;
		invisibleInput.style.position = "absolute";
		invisibleInput.style.left = "-9999px";
		invisibleInput.style.maxWidth = "20px";
		invisibleInput.style.height = "55px";
		for (let td of document.getElementsByTagName("td")) {
			td.setAttribute(
				"onclick",
				"	const td = event.target;" +
					"	const rect = td.getBoundingClientRect();" +
					"	let input = document.getElementById('invisible-input');" +
					"	input.style.top = `${Math.floor(rect.top)}px`;" +
					"	input.style.left = `${Math.floor(rect.left)}px`;" +
					"	input.focus();" +
					"	input.click();"
			);
		}
		let originalHeight = window.innerHeight;
	});

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

	const isDirection = (key, direction) => {
		switch (direction) {
			case "u":
				return ["ArrowUp", "k"].includes(key);
			case "r":
				return ["ArrowRight", "l"].includes(key);
			case "d":
				return ["ArrowDown", "j"].includes(key);
			case "l":
				return ["ArrowLeft", "h"].includes(key);
		}
	};

	onMount(
		() =>
			(document.onkeyup = (e) => {
				if (e == null) return;
				const { key, keyCode } = e;
				// clear grid
				if (key === "X") {
					[grid, zeroes] = emptyGrid();
					return;
				}
				if (selected == null) {
					if (isDirection(key, "r")) selected = [0, 0];
					if (isDirection(key, "d")) selected = [0, 4];
					if (isDirection(key, "l")) selected = [8, 8];
					if (isDirection(key, "u")) selected = [8, 4];
					return;
				}
				let [y, x] = selected;
				// unselect
				if (key === "Escape") {
					selected = null;
					return;
				}
				// navigation
				if (isDirection(key, "d")) {
					if (++y === 9) {
						y = 0;
					}
					selected = [y, x];
					return;
				} else if (isDirection(key, "l")) {
					if (--x === -1) {
						x = 8;
					}
					selected = [y, x];
					return;
				} else if (isDirection(key, "r")) {
					if (++x === 9) {
						x = 0;
					}
					selected = [y, x];
					return;
				} else if (isDirection(key, "u")) {
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
				if (!Array.from("123456789").includes(key)) return;
				// fill square
				const n = parseInt(key);
				grid[y][x] = n;
				const zindex = getZeroIndex(y, x);
				if (zindex !== -1) {
					zeroes.splice(zindex, 1);
				}
			})
	);

	const selectSquare = (y, x) => {
		selected = isSelected(y, x) ? null : [y, x];
	};
</script>

<table id="grid">
	<tbody>
		{#each grid as row, y}
			<tr>
				{#each row as cell, x}
					<td
						class="row-{y} col-{x}{isSelected(y, x) ? ' selected' : ''}"
						onclick={() => selectSquare(y, x)}
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
		margin: 0 1rem 1rem 0;

		border-collapse: collapse;
	}

	table#grid td {
		width: 56px;
		height: 56px;

		border: 1px solid black;
		background-color: #e0ffff; /* equiv to lightcyan */

		text-align: center;
		font-family: "Courier New", monospace;
		font-size: 24pt;
		color: #333;
	}

	@media screen and (orientation: portrait) {
		table#grid {
			width: 90vw;
		}

		table#grid td {
			width: 10vw;
			height: 10vw;
		}
	}

	table#grid td:hover {
		background-color: #ffffef;
	}

	table#grid td.selected {
		background-color: #ffff99;
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
</style>
