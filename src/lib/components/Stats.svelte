<script lang="ts">
	export let title: string;
	export let value: string;
	export let stats: string;
</script>

<div class="rounded-lg border bg-card text-card-foreground shadow-sm bg-white">
	<div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
		<h3 class="tracking-tight text-sm font-medium">{title}</h3>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide-icon lucide lucide-dollar-sign h-4 w-4 text-muted-foreground"
			><line x1="12" x2="12" y1="2" y2="22" /><path
				d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
			/></svg
		>
	</div>
	<div class="p-6 pt-0">
		<div class="text-2xl font-bold">{value}</div>
		<p class="text-xs text-muted-foreground">{stats}</p>
	</div>
</div>
