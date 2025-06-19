<script lang="ts">
	import { forms } from '$lib/forms'
</script>

<h1 class="mb-4 text-2xl font-bold">Economic Forms</h1>

<div class="grid gap-4 md:grid-cols-2">
	{#each Object.entries(forms) as [formId, form]}
		<div class="card bg-base-200 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{form.title}</h2>
				<p class="text-base-content/70">
					{form.cells?.length || 0} cells, {form.rows?.length || 0} rows, {form.columns?.length ||
						0} columns
				</p>
				<div class="card-actions justify-end">
					<a href="form/{formId}" class="btn btn-primary">Open Form</a>
				</div>
			</div>
		</div>
	{/each}
</div>
