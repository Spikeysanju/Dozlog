<script lang="ts">
	export let orderId: string;
	export let orderDate: string;
	export let orderTotal: string;
	export let orderQuantity: string;
	export let orderedBy: string;
</script>

<div
	class="flex flex-col w-full gap-3 items-center justify-center max-w-lg p-6 border border-r-gray-100 rounded-md"
>
	<div class="flex w-full items-center justify-between flex-row">
		<div>
			<h5 class="font-medium text-gray-950 text-base">Order number</h5>
			<p class="text-sm text-gray-500">{orderId}</p>
		</div>

		<div>
			<h5 class="font-medium text-gray-950 text-base">Order date</h5>
			<p class="text-sm text-gray-500">{orderDate}</p>
		</div>

		<div>
			<h5 class="font-medium text-gray-950 text-base">Order items</h5>
			<p class="text-sm text-gray-500">{orderQuantity}</p>
		</div>

		<div>
			<h5 class="font-medium text-gray-950 text-base">Order total</h5>
			<p class="text-sm text-gray-500">{orderTotal}</p>
		</div>
	</div>

	<slot />

	<div class="flex w-full items-center justify-between flex-row">
		<p class="text-gray-500 text-sm">Estimated delivery date July 12, 2023</p>

		<button class="text-pink-500 font-medium text-sm"> Buy again </button>
	</div>

	<div class="w-full">
		<p class="text-500 text-sm text-start w-full">User Id:{orderedBy}</p>
	</div>
</div>
