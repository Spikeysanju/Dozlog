<script lang="ts">
	import { networkStore } from 'svelte-legos';
	import '$lib/app.css';
	import OfflineBanner from '$lib/components/OfflineBanner.svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	const networkState = networkStore();
</script>

<div class="mx-auto p-3 sm:px-6 lg:px-8 bg-gray-50">
	<Toaster />
	{#if !$networkState.isOnline}
		<OfflineBanner />
	{/if}
	<slot />
</div>

<!-- <style lang="postcss">
	:global(html) {
		background-color: theme(colors.white);
	}
</style> -->
