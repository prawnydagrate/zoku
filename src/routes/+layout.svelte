<script>
	import { onMount } from "svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<title>zoku</title>
</svelte:head>

<Navbar />

<div style="margin: 1rem auto auto 1rem; min-height: 80vh;">
	{@render children()}
</div>

<Footer />
