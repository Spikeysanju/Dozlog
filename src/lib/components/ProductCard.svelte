<script lang="ts">
	import { formatNumericValue } from '$lib/utils/utils';

	export let title: string;
	export let description: string | null;
	export let price: number;
	export let image: string | null;
	export let quantity: number;
	export let type: 'product' | 'cart';
</script>

{#if type === 'product'}
	<div>
		<div class="relative">
			<div class="relative h-72 w-full overflow-hidden rounded-lg">
				<img
					src={image}
					alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls."
					class="h-full w-full object-cover object-center"
				/>
			</div>
			<div class="relative mt-4">
				<h3 class="text-sm font-medium text-gray-900">{title}</h3>
				<p class="mt-1 text-sm text-gray-500">{description}</p>
			</div>
			<div
				class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4"
			>
				<div
					aria-hidden="true"
					class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
				/>
				<p class="relative text-lg font-semibold text-white">${price}</p>
			</div>
		</div>
		<div class="mt-6">
			<slot />
		</div>
	</div>
{:else}
	<div class="flex flex-row w-full items-center justify-center space-x-3">
		<img src={image} alt={title} class="h-24 w-24 rounded-md object-cover object-center" />

		<div class="flex w-full items-center justify-between">
			<div class="relative mt-4">
				<h3 class="text-sm font-medium text-gray-900">{title}</h3>
				<p class="mt-1 text-sm text-gray-500">{description}</p>
				<small class="text-sm text-gray-500">Qty: {quantity}</small>
				<slot />
			</div>

			<p class="text-base font-medium text-gray-700">${price}</p>
		</div>
	</div>
{/if}
