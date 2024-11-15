<script>
	import { onMount } from "svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<title>zoku</title>
</svelte:head>

<Navbar />

<div style="margin-top: 92px">
	{@render children()}
</div>
