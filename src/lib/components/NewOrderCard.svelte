<script lang="ts">
	import { convertUnixTimestamp } from '$lib/utils/utils';

	export let orderId: string;
	export let orderDate: string;
	export let orderTotal: string;
	export let orderQuantity: string;
	export let orderedBy: string;
</script>

<div
	class="flex flex-col w-full gap-3 items-center justify-center p-6 border bg-white border-r-gray-100 rounded-md"
>
	<div class="flex w-full items-center justify-between flex-row">
		<div>
			<h5 class="font-medium text-gray-950 text-sm">Order number</h5>
			<p class="text-sm text-gray-500">#{orderId}</p>
		</div>

		<div>
			<h5 class="font-medium text-gray-950 text-sm">Order date</h5>
			<p class="text-sm text-gray-500">{convertUnixTimestamp(orderDate)}</p>
		</div>

		<div>
			<h5 class="font-medium text-gray-950 text-sm">Order items</h5>
			<p class="text-sm text-gray-500">{orderQuantity}</p>
		</div>

		<div>
			<h5 class="font-medium text-gray-950 text-sm">Order total</h5>
			<p class="text-sm text-gray-500">{orderTotal}</p>
		</div>
	</div>

	<slot />

	<div class="flex w-full items-center justify-between flex-row">
		<p class="text-500 text-sm text-start w-full">User Id: {orderedBy}</p>

		<button class="text-pink-500 font-medium text-sm text-end w-full"> Buy again </button>
	</div>
</div>
