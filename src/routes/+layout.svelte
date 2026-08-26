<script lang="ts">
	import favicon from "#lib/assets/favicon.svg";
	import Login from "#lib/components/Login.svelte";
	import SignUp from "#lib/components/SignUp.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Login />

<SignUp />

{@render children()}
