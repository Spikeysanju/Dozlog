<script lang="ts">
	import { convertUnixTimestamp } from '$lib/utils/utils';

	export let cartId: string;
	export let productId: string;
	export let quantity: string;
	export let timestamp: string;
	export let orderedBy: string;
</script>

<div
	class="flex flex-col w-full gap-3 items-center justify-center p-6 border border-r-gray-100 rounded-md bg-white"
>
	<div class="flex w-full items-center justify-between flex-row">
		<div>
			<h5 class="font-medium text-gray-950 text-sm">Cart Id</h5>
			<p class="text-sm text-gray-500">{cartId}</p>
		</div>

		<div>
			<h5 class="font-medium text-gray-950 text-sm">Created at</h5>
			<p class="text-sm text-gray-500">{convertUnixTimestamp(timestamp)}</p>
		</div>

		<div>
			<h5 class="font-medium text-gray-950 text-sm">Quantity</h5>
			<p class="text-sm text-gray-500 text-end">{quantity}</p>
		</div>
	</div>

	<slot />

	<div class="flex w-full items-center justify-between flex-row">
		<p class="text-500 text-sm text-start w-full">User Id:{orderedBy}</p>

		<button class="text-pink-500 font-medium text-sm w-full text-end"> Buy again </button>
	</div>
</div>
