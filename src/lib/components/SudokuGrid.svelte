<script>
	const { grid, zeroes } = $props();
</script>

<table id="grid">
	<tbody>
		{#each grid as row, y}
			<tr>
				{#each row as cell, x}
					<td class="row-{y} col-{x}">
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
