<script lang="ts">
	import { enhance } from '$app/forms';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { ApiClient } from '@dozerjs/dozer';
	import { RecordMapper } from '@dozerjs/dozer/lib/cjs/helper';
	import { OperationType } from '@dozerjs/dozer/lib/esm/generated/protos/types_pb.js';
	import type { DozerFilter } from '@dozerjs/dozer/lib/esm/query_helper.js';
	import { onMount } from 'svelte';

	let results: any = null;
	let records: any = [];
	let fields: any = [];
	let productState: any = {
		records: [],
		fields: []
	};

	onMount(async () => {
		const filter: DozerFilter = {
			name: {
				$eq: 'Product 1'
			}
		};
		const productClient = new ApiClient('product');
		productClient.query().then(([fields, records]) => {
			console.log('fields', JSON.stringify(fields, null, 2));
			console.log('records', JSON.stringify(records, null, 2));

			productState.records = records;
			productState.fields = fields;
		});

		// init dozer client
		productClient.getFields().then((fieldsResponse) => {
			let fields = fieldsResponse.getFieldsList();
			let mapper = new RecordMapper(fieldsResponse.getFieldsList());
			let primaryIndexList = fieldsResponse.getPrimaryIndexList();
			let primaryIndexKeys = primaryIndexList.map((index) => fields[index].getName());

			let stream = productClient.onEvent();
			stream.on('data', (response) => {
				if (response.getTyp() === OperationType.UPDATE) {
					let oldValue = mapper.mapRecord(response?.getOld()?.getValuesList()!);
					let records = productState.records;
					let existingIndex = records.findIndex((v: { [x: string]: any }) =>
						primaryIndexKeys.every((k) => v[k] === oldValue[k])
					);

					if (existingIndex > -1) {
						records[existingIndex] = mapper.mapRecord(response?.getNew()?.getValuesList()!);
						productState.records = records;
					}
				}

				// insert event
				if (response.getTyp() === OperationType.INSERT) {
					let record = mapper.mapRecord(response?.getNew()?.getValuesList()!);
					productState.records = [record, ...productState.records];
				}

				// delete event
				if (response.getTyp() === OperationType.DELETE) {
					let record = mapper.mapRecord(response?.getNew()?.getValuesList()!);
					let records = productState.records;
					let existingIndex = records.findIndex((v: { [x: string]: any }) =>
						primaryIndexKeys.every((k) => v[k] === record[k])
					);

					if (existingIndex > -1) {
						records.splice(existingIndex, 1);
						productState.records = records;
					}
				}
			});
		});
	});

	export let data;
</script>

<div class="bg-white">
	<h1 class="text-2xl font-bold text-gray-900">Welcome back, {data.currentUser.name}</h1>

	<h2 class="text-xl font-bold text-gray-900 py-3">Recommeded Products</h2>

	<div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
		{#each productState.records as item}
			<ProductCard
				title={item.name}
				description={item.description}
				price={item.price}
				image={item.image}
				type="product"
				quantity={1}
			>
				<form id="add-to-cart-form" method="POST">
					<input hidden type="text" name="productId" value={item.id} />
					<input hidden type="text" name="quantity" value="1" />
					<button
						type="submit"
						formaction="?/addToCart"
						class="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
						>Add to bag
					</button>
				</form>
			</ProductCard>
		{/each}
	</div>
</div>
