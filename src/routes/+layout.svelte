<script>
	import { onMount } from "svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<title>zoku</title>
</svelte:head>

<div style="display: flex; flex-direction: column; flex-grow: 1">
	<Navbar />

	<div style="flex-grow: 1; margin: 1rem auto 1rem 1rem">
		{@render children()}
	</div>
</div>

<Footer />
