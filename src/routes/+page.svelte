<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	onMount(() => goto(`/edit/${"0".repeat(81)}`));
</script>

<span id="wait">Loading...</span>

<style>
	#wait {
		font-family: "VT323", monospace;
		font-size: 18pt;
	}
</style>
