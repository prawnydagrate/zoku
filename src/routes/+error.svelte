<script>
	import { page } from "$app/stores";

	const error = $page.error;
	const target = `/edit/${error.gridstr || "0".repeat(81)}`;
</script>

<h1>
	{#if error.valid && !error.legal}
		Oops, this grid is illegal.
	{:else if !error.valid}
		Oops, this grid is invalid.
	{/if}
</h1>
<a href={target}>Edit here</a>

<style>
	h1,
	a {
		font-family: "VT323", monospace;
	}

	a {
		font-size: x-large;
	}
</style>
