<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	onMount(() => goto(`/edit/${"0".repeat(81)}`));
</script>

<span id="wait">Loading...</span>

<style>
	@import url("https://fonts.googleapis.com/css2?family=VT323&display=swap");

	#wait {
		font-family: "VT323", monospace;
		font-size: 18pt;
	}
</style>
