<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { ApiClient } from '@dozerjs/dozer';
	import { RecordMapper } from '@dozerjs/dozer/lib/cjs/helper';
	import { OperationType } from '@dozerjs/dozer/lib/cjs/generated/protos/types_pb.js';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	let results: any = null;
	let records: any = [];
	let fields: any = [];
	let productState: any = {
		records: [],
		fields: []
	};

	onMount(async () => {
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

			console.info('fields', fields);
			console.info('primary index keys', primaryIndexKeys);
			console.log('primary index list', primaryIndexList);
			console.info('mapper', mapper);

			let stream = productClient.onEvent();
			stream.on('data', (response) => {
				if (response.getTyp() === OperationType.UPDATE) {
					let oldValue = mapper.mapRecord(response?.getOld()?.getValuesList()!);
					let records = productState.records;
					let existingIndex = records.findIndex((v: { [x: string]: any }) =>
						primaryIndexKeys.every((k) => v[k] === oldValue[k])
					);

					console.log('old', oldValue);
					console.log('new', mapper.mapRecord(response?.getNew()?.getValuesList()!));
					console.log('existingIndex', existingIndex);

					if (existingIndex > -1) {
						console.log('updating');
						records[existingIndex] = mapper.mapRecord(response?.getNew()?.getValuesList()!);
						console.log('updated', records[existingIndex]);
						productState.records = records;
					}

					console.log('product updated', response?.getNew()?.getValuesList()!);
				}

				// insert event
				if (response.getTyp() === OperationType.INSERT) {
					let record = mapper.mapRecord(response?.getNew()?.getValuesList()!);
					console.log('inserting', record);
					productState.records = [record, ...productState.records];
				}

				// delete event
				if (response.getTyp() === OperationType.DELETE) {
					let record = mapper.mapRecord(response?.getNew()?.getValuesList()!);

					let records = productState.records;

					let existingIndex = records.findIndex((v: { [x: string]: any }) =>
						primaryIndexKeys.every((k) => v[k] === record[k])
					);

					console.log('deleting', record);
					console.log('existingIndex', existingIndex);

					if (existingIndex > -1) {
						console.log('deleting');
						records.splice(existingIndex, 1);
						productState.records = records;
					}

					console.log('deleted', record);
				}
			});
		});
	});

	$: console.log('productState', productState.records);

	export let data;
</script>

<div class="bg-white">
	<h1 class="text-2xl font-bold text-gray-900">Welcome back, {data.currentUser.name}</h1>

	<h2 class="text-xl font-bold text-gray-900 py-3">Recommeded Products</h2>

	<div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
		{#each productState.records as item}
			<!-- <h1>{item.price}</h1> -->
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
