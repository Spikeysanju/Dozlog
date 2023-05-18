<script lang="ts">
	import { onMount } from 'svelte';
	import { ApiClient } from '@dozerjs/dozer';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { RecordMapper } from '@dozerjs/dozer/lib/esm/helper';
	import { EventType } from '@dozerjs/dozer/lib/esm/generated/protos/types_pb.js';

	let results: any = null;

	onMount(async () => {
		//init client
		const products = new ApiClient('product');

		products.getFields().then((fieldsResponse) => {
			let fields = fieldsResponse.getFieldsList();
			let mapper = new RecordMapper(fieldsResponse.getFieldsList());
			let primaryIndexList = fieldsResponse.getPrimaryIndexList();
			let primaryIndexKeys = primaryIndexList.map((index) => fields[index].getName());

			let stream = products.onEvent();
			stream.on('data', (data) => {
				let oldValue = mapper.mapRecord(data.getOld().getValuesList());
				let records = state.records;
				let existingIndex = records.findIndex((v: any) =>
					primaryIndexKeys.every((k) => v[k] === oldValue[k])
				);

				if (existingIndex > -1) {
					records[existingIndex] = mapper.mapRecord(data.getNew().getValuesList());

					results = JSON.stringify(records, null, 2);
				}
			});
		});

		// let stream = products.onEvent(EventType.ALL);
		// stream.on('data', (response) => {
		// 	console.log(response);
		// 	results = JSON.stringify(response, null, 2);
		// });
	});

	export let data;
</script>

<div class="bg-white">
	<h1 class="text-2xl font-bold text-gray-900">Welcome back, {data.currentUser.name}</h1>

	<h2 class="text-xl font-bold text-gray-900 py-3">Recommeded Products</h2>

	<div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
		{#each data.products as item}
			<ProductCard
				title={item.name}
				description={item.description}
				price={123}
				image={item.image}
				on:click={() => console.log('clicked')}
			/>
		{/each}
	</div>

	<pre>{results}</pre>
</div>
