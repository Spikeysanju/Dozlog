<script lang="ts">
	import type { PageData } from './$types';

	const menu = [
		{
			name: 'New users'
		},
		{
			name: 'Cart'
		},
		{
			name: 'Wishlist'
		},
		{
			name: 'Orders'
		},
		{
			name: 'Logs'
		},
		{
			name: 'Reviews'
		},
		{
			name: 'Sessions'
		}
	];

	let active = 0;

	export let data: PageData;
</script>

<div class="flex flex-col w-full items-center justify-center">
	<h1 class="text-2xl font-bold text-gray-900 text-start w-full">Realtime logs</h1>

	<div class="flex flex-col items-start justify-start w-full overflow-auto">
		<div
			class="flex flex-row w-auto mt-3 items-start justify-start gap-3 py-3 bg-gray-50 px-3 rounded-lg"
		>
			{#each menu as item}
				<div
					class="bg-white px-3 w-fit text-center py-2 rounded-md hover:cursor-pointer hover:bg-white shadow-sm hover:shadow-md"
				>
					{item.name}
				</div>
			{/each}
		</div>
	</div>
</div>
