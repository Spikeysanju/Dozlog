<script lang="ts">
	import type { Product } from '$lib/db/db';
	import { convertISOTimestamp } from '$lib/utils/utils';
	import { onMount } from 'svelte';

	export let ids: string[];
	let product: Product[];

	onMount(async () => {
		const data = await fetch('/api/product', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ids: ids
			})
		}).then((res) => res.json());

		product = data;
	});
</script>

{#each product as item}
	<div class="flex flex-row w-full h-fit items-start justify-start space-x-3 max-w-lg">
		<div class="flex flex-row items-center justify-center">
			<img
				src={`https://avatar.vercel.sh/${item.image}?size=30`}
				alt={item.name}
				class="rounded-full aspect-auto"
			/>
		</div>

		<div class="flex flex-col w-full items-center justify-center">
			<div class="flex flex-col items-start justify-center w-full">
				<h5 class="text-base font-medium text-gray-950 truncate">{item.name}</h5>
				<p class="text-gray-500 whitespace-pre-line text-sm">{item.description}</p>
			</div>

			<div class="flex flex-row items-center justify-between w-full text-gray-500 text-sm">
				<p>#{item.userId}</p>
				<p>{convertISOTimestamp(item.createdAt.toString())}</p>
			</div>
		</div>
	</div>
{/each}
