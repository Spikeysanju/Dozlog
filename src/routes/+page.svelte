<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';

	export let data;
</script>

<div class="bg-white">
	<!-- <h1 class="text-2xl font-bold text-gray-900">Welcome back, {data.currentUser.name}</h1> -->

	<h2 class="text-xl font-bold text-gray-900 py-3">Recommeded Products</h2>

	<div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
		{#each data.products as item}
			<ProductCard title={item.name} description={item.description} price={123} image={item.image}>
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
