<script lang="ts">
	import '$lib/app.css';
</script>

<div class="mx-auto max-w-7xl p-3 sm:px-6 lg:px-8">
	<slot />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.white);
	}
</style>
