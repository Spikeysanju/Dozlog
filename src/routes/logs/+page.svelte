<script lang="ts">
	import { onMount } from 'svelte';
	import { ApiClient } from '@dozerjs/dozer';
	import { RecordMapper } from '@dozerjs/dozer/lib/cjs/helper';
	import { OperationType } from '@dozerjs/dozer/lib/cjs/generated/protos/types_pb.js';

	let results: any = null;
	let records: any = [];
	let fields: any = [];
	let state: any = {
		records: [],
		fields: []
	};

	// total cart items
	let totalCartItems = 0;

	$: totalCartItems = state.records.reduce((acc: any, curr: any) => {
		return acc + curr.quantity;
	}, 0);

	onMount(async () => {
		// init dozer client
		const client = new ApiClient('cart');
		client.query().then(([fields, records]) => {
			console.log('fields', JSON.stringify(fields, null, 2));
			console.log('records', JSON.stringify(records, null, 2));

			state.records = records;
			state.fields = fields;
		});

		client.getFields().then((fieldsResponse) => {
			let fields = fieldsResponse.getFieldsList();
			let mapper = new RecordMapper(fieldsResponse.getFieldsList());
			let primaryIndexList = fieldsResponse.getPrimaryIndexList();
			let primaryIndexKeys = primaryIndexList.map((index) => fields[index].getName());

			console.info('fields', fields);
			console.info('primary index keys', primaryIndexKeys);
			console.log('primary index list', primaryIndexList);
			console.info('mapper', mapper);

			let stream = client.onEvent();
			stream.on('data', (response) => {
				if (response.getTyp() === OperationType.UPDATE) {
					let oldValue = mapper.mapRecord(response?.getOld()?.getValuesList()!);
					let records = state.records;
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
						state.records = records;
					}
				}

				// insert event
				if (response.getTyp() === OperationType.INSERT) {
					let record = mapper.mapRecord(response?.getNew()?.getValuesList()!);
					console.log('inserting', record);
					state.records = [record, ...state.records];
				}

				// delete event
				if (response.getTyp() === OperationType.DELETE) {
					let record = mapper.mapRecord(response?.getNew()?.getValuesList()!);

					let records = state.records;

					let existingIndex = records.findIndex((v: { [x: string]: any }) =>
						primaryIndexKeys.every((k) => v[k] === record[k])
					);

					console.log('deleting', record);
					console.log('existingIndex', existingIndex);

					if (existingIndex > -1) {
						console.log('deleting');
						records.splice(existingIndex, 1);
						state.records = records;
					}

					console.log('deleted', record);
				}
			});
		});
	});
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

	export let data;
</script>

<div class="flex flex-col w-full items-center justify-center">
	<h1 class="text-2xl font-bold text-gray-900 text-start w-full">Realtime logs</h1>

	<h1>Cart: {totalCartItems}</h1>
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

		{#if state.records.length === 0}
			<p>No records found</p>
		{:else}
			{#each state.records as item}
				<h1>Card Id: {item.id}</h1>
				<p>Quantity: {item.quantity}</p>
			{/each}
		{/if}
	</div>
</div>
