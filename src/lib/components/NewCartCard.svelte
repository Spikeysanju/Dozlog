<script lang="ts">
	export let cartId: string;
	export let productId: string;
	export let quantity: string;
	export let timestamp: string;
	export let orderedBy: string;
</script>

<div
	class="flex flex-col w-full gap-3 items-center justify-center max-w-lg p-6 border border-r-gray-100 rounded-md"
>
	<div class="flex w-full items-center justify-between flex-row">
		<div>
			<h5 class="font-medium text-gray-950 text-base">Cart Id</h5>
			<p class="text-sm text-gray-500">{cartId}</p>
		</div>

		<div>
			<h5 class="font-medium text-gray-950 text-base">Cart added</h5>
			<p class="text-sm text-gray-500">{timestamp}</p>
		</div>

		<div>
			<h5 class="font-medium text-gray-950 text-base">Quantity</h5>
			<p class="text-sm text-gray-500">{quantity}</p>
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
