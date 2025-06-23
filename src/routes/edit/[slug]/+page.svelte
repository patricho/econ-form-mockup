<script lang="ts">
	import type { PageProps } from './$types'
	import {
		FormCellType,
		type FormCell,
		type FormColumn,
		type FormRow,
		type TransactionType,
		type TransactionSource
	} from '$lib/types'

	let { data }: PageProps = $props()

	let formCells: FormCell[] = data.cells
	let formRows: FormRow[] = data.rows
	let formColumns: FormColumn[] = data.columns
	let formTitle: string = data.title
	let transactionTypes: TransactionType[] = data.transactionTypes
	let transactionSources: TransactionSource[] = data.transactionSources

	const maxX = Math.max(...formCells.map((c) => c.x))
	const maxY = Math.max(...formCells.map((c) => c.y))

	let expandedMode = $state(false)

	const cellTypeOptions = [
		{ value: FormCellType.INPUT, label: 'INPUT' },
		{ value: FormCellType.STATIC, label: 'STATIC' },
		{ value: FormCellType.SUM, label: 'SUM' },
		{ value: FormCellType.FORMULA, label: 'FORMULA' }
	]

	function getCellByPosition(x: number, y: number): FormCell | undefined {
		return formCells.find((c) => c.x === x && c.y === y)
	}
</script>

<div class="mb-4 flex items-center justify-between">
	<h1 class="text-2xl font-bold">Edit: {formTitle}</h1>

	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text mr-2">Expanded Mode</span>
			<input type="checkbox" class="toggle toggle-primary" bind:checked={expandedMode} />
		</label>
	</div>
</div>

<hr class="mb-4" />

{#if formCells.length === 0}
	<div class="alert alert-info">
		<p>No form data available for editing.</p>
	</div>
{:else}
	<div class="overflow-x-auto">
		<table class="table">
			<thead class="dark:text-stone-400">
				<tr class="bg-base-200">
					<th class=""></th>
					{#each { length: maxX + 1 }, x}
						<th class=" text-center">
							{formColumns[x]?.title || formColumns[x]?.transactionSource?.title || `Col ${x}`}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each { length: maxY + 1 }, y}
					<tr>
						<th class="bg-base-200 text-center dark:text-stone-400">
							{formRows[y]?.title || formRows[y]?.transactionType?.title || `Row ${y}`}
						</th>
						{#each { length: maxX + 1 }, x}
							{@const cell = getCellByPosition(x, y)}
							<td class=" p-2 align-top" style="min-width: 200px;">
								{#if cell}
									<div class="space-y-2">
										{#if expandedMode}
											<!-- Cell Type Select -->
											<select class="select select-xs select-bordered w-full">
												{#each cellTypeOptions as option}
													<option value={option.value} selected={cell.type === option.value}>
														{option.label}
													</option>
												{/each}
											</select>

											<!-- Transaction Type Select -->
											<!-- <select class="select select-xs select-bordered w-full">
												<option value="">No Transaction Type</option>
												{#each transactionTypes as transactionType}
													<option
														value={transactionType.id}
														selected={cell.transactionType?.id === transactionType.id}
													>
														{transactionType.title}
													</option>
												{/each}
											</select> -->

											<!-- Transaction Source Select -->
											<!-- <select class="select select-xs select-bordered w-full">
												<option value="">No Transaction Source</option>
												{#each transactionSources as transactionSource}
													<option
														value={transactionSource.id}
														selected={cell.transactionSource?.id === transactionSource.id}
													>
														{transactionSource.title}
													</option>
												{/each}
											</select> -->

											<!-- Legend Textbox -->
											<input
												type="text"
												class="input input-xs input-bordered w-full"
												placeholder="Legend/Label"
												value={cell.legend || ''}
											/>

											<!-- Dependencies (read-only for now) -->
											{#if cell.dependencies && cell.dependencies.length > 0}
												<div class="text-base-content/50 text-xs">
													Deps: {cell.dependencies.join(', ')}
												</div>
											{/if}

											<!-- Formula (read-only for now) -->
											{#if cell.formula}
												<div class="text-base-content/50 font-mono text-xs">
													Formula: {cell.formula}
												</div>
											{/if}
										{:else}
											<!-- Compact mode: show type and basic info -->
											<div class="text-xs">
												<span class="badge badge-xs">
													{cellTypeOptions.find((opt) => opt.value === cell.type)?.label ||
														'UNKNOWN'}
												</span>
												{#if cell.legend}
													<span class="text-base-content/70 ml-1">{cell.legend}</span>
												{/if}
											</div>
										{/if}
									</div>
								{:else}
									<div class="text-base-content/30 text-xs">Empty</div>
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if expandedMode}
		<div class="mt-6">
			<h3 class="mb-2 text-lg font-semibold">Form Statistics</h3>
			<div class="stats shadow">
				<div class="stat">
					<div class="stat-title">Total Cells</div>
					<div class="stat-value text-2xl">{formCells.length}</div>
				</div>
				<div class="stat">
					<div class="stat-title">INPUT Cells</div>
					<div class="stat-value text-2xl">
						{formCells.filter((c) => c.type === FormCellType.INPUT).length}
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">SUM Cells</div>
					<div class="stat-value text-2xl">
						{formCells.filter((c) => c.type === FormCellType.SUM).length}
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">FORMULA Cells</div>
					<div class="stat-value text-2xl">
						{formCells.filter((c) => c.type === FormCellType.FORMULA).length}
					</div>
				</div>
			</div>
		</div>
	{/if}
{/if}
