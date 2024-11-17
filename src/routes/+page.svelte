<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	onMount(() => goto(`/edit/${"0".repeat(81)}`));
</script>
