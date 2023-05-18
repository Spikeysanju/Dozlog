<script lang="ts">
	export let title: string;
	export let description: string;
	export let timestamp: string;
	export let category: string;
	export let emoji: string = '📝';
</script>

<div class="flex flex-row w-full h-fit items-start justify-start space-x-3">
	<div class="flex flex-row items-center justify-center">
		<div class="flex flex-row items-center justify-center w-12 h-12 bg-gray-50 rounded-xl">
			<p class="text-2xl">{emoji}</p>
		</div>
	</div>

	<div class="flex flex-col w-full items-center justify-center">
		<div class="flex flex-col items-start justify-center w-full">
			<h5 class="text-base font-medium text-gray-950 truncate">{title}</h5>
			<p class="text-gray-500 whitespace-pre-line text-base">{description}</p>
		</div>

		<div class="flex flex-row items-center justify-between w-full text-gray-500 text-sm">
			<p>{category}</p>
			<p>{timestamp}</p>
		</div>
	</div>
</div>
