<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{data.game.title}</h1>
<div>{data.game.description}</div>
