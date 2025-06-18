<script lang="ts">
	enum FormCellType {
		INPUT,
		STATIC
	}

	type TransactionSource = {
		id: number
		title: string
	}

	type TransactionType = {
		id: number
		title: string
	}

	type FormCell = {
		id: number
		x: number
		y: number
		alias: string
		legend: string
		type: FormCellType
		transactionType: TransactionType
		transactionSource: TransactionSource
	}
	const formCells: FormCell[] = [
		{ x: 0, y: 0, alias: 'A1', type: FormCellType.INPUT } as FormCell,
		{ x: 1, y: 0, alias: 'B1', type: FormCellType.INPUT } as FormCell,
		{ x: 2, y: 0, alias: 'C1', type: FormCellType.INPUT } as FormCell,
		{ x: 3, y: 0, alias: 'D1', type: FormCellType.INPUT } as FormCell,
		{ x: 0, y: 1, alias: 'A2', type: FormCellType.INPUT } as FormCell,
		{ x: 1, y: 1, alias: 'B2', type: FormCellType.INPUT } as FormCell,
		{ x: 2, y: 1, alias: 'C2', type: FormCellType.INPUT } as FormCell,
		{ x: 3, y: 1, alias: 'D2', type: FormCellType.STATIC, legend: 'Static value' } as FormCell
	]

	const maxX = Math.max(...formCells.map((c) => c.x))
	const maxY = Math.max(...formCells.map((c) => c.y))
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<hr />

<div class="card bg-base-100 mt-8 w-96 shadow-sm">
	<figure>
		<img
			src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
			alt="Shoes"
		/>
	</figure>
	<div class="card-body">
		<h2 class="card-title">Card Title</h2>
		<p>
			A card component has a figure, a body part, and inside body there are title and actions parts
		</p>
		<div class="card-actions justify-end">
			<button class="btn btn-primary">Buy Now</button>
		</div>
	</div>
</div>

<hr />

<ul class="my-4">
	<li>maxX: {maxX}</li>
	<li>maxY: {maxY}</li>
</ul>

<div class="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
	<table class="table">
		<thead class="dark:text-stone-400">
			<tr>
				<th></th>
				{#each { length: maxX + 1 }, x}
					<th>{String.fromCharCode(65 + x)}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each { length: maxY + 1 }, y}
				<tr>
					<th class="dark:text-stone-400">{y + 1}</th>
					{#each { length: maxX + 1 }, x}
						{@const cell = formCells.find((c) => c.x == x && c.y == y)}
						<td>
							{#if cell}
								<fieldset class="fieldset">
									<!-- <legend class="fieldset-legend">What is your name?</legend> -->

									{#if cell.type == FormCellType.INPUT}
										<input type="text" class="input" placeholder={cell.alias} />
									{:else if cell.type == FormCellType.STATIC}
										<input
											type="text"
											placeholder="You can't touch this"
											class="input input-ghost"
											value="123"
											disabled
										/>
									{:else}
										wtf
									{/if}

									<p class="label">{cell.legend}</p>
								</fieldset>
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
