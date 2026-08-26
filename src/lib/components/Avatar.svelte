<script lang="ts">
	import { Style, Avatar } from "@dicebear/core";
	import initials from "@dicebear/styles/initials.json" with { type: "json" };

	let { seed } = $props();
	let value = $state("");

	const style = new Style(initials);
	const avatar = $derived(
		new Avatar(style, {
			seed: seed,
		}),
	);
</script>

<img src={avatar.toDataUri()} width="250px" alt="Avatar" /><br />
<input type="text" bind:value />
