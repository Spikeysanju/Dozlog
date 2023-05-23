<script lang="ts">
	export let username: string;
	export let email: string;
	export let userId: string;
	export let timestamp: string;
</script>

<div class="flex flex-row w-full h-fit items-start justify-start space-x-3 max-w-lg">
	<div class="flex flex-row items-center justify-center">
		<img
			src={`https://avatar.vercel.sh/${username}?size=30`}
			alt={username}
			class="rounded-full aspect-auto"
		/>
	</div>

	<div class="flex flex-col w-full items-center justify-center">
		<div class="flex flex-col items-start justify-center w-full">
			<h5 class="text-base font-medium text-gray-950 truncate">{username}</h5>
			<p class="text-gray-500 whitespace-pre-line text-base">{email}</p>
		</div>

		<div class="flex flex-row items-center justify-between w-full text-gray-500 text-sm">
			<p>#{userId}</p>
			<p>{timestamp}</p>
		</div>
	</div>
</div>
