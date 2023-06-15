<script lang="ts">
	import { ApiClient } from '@dozerjs/dozer';
	import { onMount } from 'svelte';

	let productState: any = {
		records: [],
		fields: []
	};

	onMount(async () => {
		// init dozer client
		const dozer = new ApiClient('all_products');
		dozer.query().then(([fields, records]) => {
			productState.records = records;
			productState.fields = fields;
		});
	});
</script>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<h2 class="text-xl font-bold text-gray-900">Based on your last visit</h2>

		<div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
			{#each productState.records as item}
				<h1>{item.name}</h1>
			{/each}
		</div>
	</div>
</div>
