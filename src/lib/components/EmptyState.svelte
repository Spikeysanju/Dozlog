<script lang="ts">
	export let title = 'No projects';
	export let description = 'Get started by creating a new project.';
</script>

<div class="text-center items-center justify-center flex flex-col">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="icon icon-tabler icon-tabler-info-circle"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="#2c3e50"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
		<path d="M12 9h.01" />
		<path d="M11 12h1v4h1" />
	</svg>

	<h3 class="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
	<p class="mt-1 text-sm text-gray-500">{description}</p>
</div>
