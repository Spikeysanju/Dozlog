<script lang="ts">
	export let username: string;
	export let email: string;
	export let userId: string;
	export let image: string;
</script>

<div
	class="flex flex-row bg-white w-full h-fit items-start justify-start space-x-3 max-w-lg p-6 border border-r-gray-100 rounded-md"
>
	<div class="flex flex-row items-center justify-center">
		<img src={image} alt={username} class="rounded-full w-12 aspect-auto" />
	</div>

	<div class="flex flex-col w-full items-center justify-center">
		<div class="flex flex-col items-start justify-center w-full">
			<h5 class="text-base font-medium text-gray-950 truncate">{username}</h5>
			<p class="text-gray-500 whitespace-pre-line text-base">{email}</p>
		</div>

		<div class="flex flex-row items-center justify-between w-full text-gray-500 text-sm">
			<p class="text-500 text-sm text-start">Id: {userId}</p>
		</div>
	</div>
</div>
