<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	export let data;
</script>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<h2 class="text-xl font-bold text-gray-900">Based on your last visit</h2>

		<div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
			<ProductCard
				title="Tick tack shoes"
				description="shoes company"
				price={123}
				image="https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg"
				on:click={() => console.log('clicked')}
			/>
		</div>
	</div>
</div>
