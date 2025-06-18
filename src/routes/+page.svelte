<script lang="ts">
	import { onMount } from 'svelte'
	import type { PageProps } from './$types'

	import { FormCellType, type CellValue, type FormCell } from '$lib/types'
	import { calculateCellFormula, calculateCellSum } from '$lib/grid'

	let { data }: PageProps = $props()

	let formCells: FormCell[] = data.cells
	let formTitle: string = data.title

	const maxX = Math.max(...formCells.map((c) => c.x))
	const maxY = Math.max(...formCells.map((c) => c.y))

	const cellValues: CellValue[][] = $state([])
	for (let y = 0; y <= maxY; y++) {
		cellValues[y] = []
		for (let x = 0; x <= maxX; x++) {
			const cell = formCells.find((c) => c.x === x && c.y === y)
			if (cell) {
				cellValues[y][x] = { value: '0', cell }
			}
		}
	}

	function handleCellChange(x: number, y: number, value: string) {
		if (cellValues[y] && cellValues[y][x]) {
			cellValues[y][x].value = value
			const alias = cellValues[y][x].cell.alias

			const event = new CustomEvent('cellchange', {
				detail: { alias, value, x, y, cell: cellValues[y][x].cell }
			})
			document.dispatchEvent(event)
		}
	}

	function calculateCell(cell: FormCell) {
		if (!cell.dependencies || cell.dependencies.length === 0) return

		const targetCell = cellValues[cell.y]?.[cell.x]
		if (!targetCell) return

		let newValue = targetCell.value

		if (cell.type == FormCellType.FORMULA) {
			newValue = calculateCellFormula(cellValues, formCells, cell)
		} else if (cell.type == FormCellType.SUM) {
			newValue = calculateCellSum(cellValues, formCells, cell)
		}

		if (targetCell.value !== newValue) {
			targetCell.value = newValue

			document.dispatchEvent(
				new CustomEvent('cellchange', {
					detail: {
						alias: cell.alias,
						value: newValue,
						x: cell.x,
						y: cell.y,
						cell: targetCell.cell
					}
				})
			)
		}
	}

	function setupDependencyListeners() {
		formCells.forEach((cell) => {
			if (!cell.dependencies?.length) return
			document.addEventListener('cellchange', (ev: Event) => {
				if (cell.dependencies?.includes((ev as CustomEvent).detail.alias)) {
					calculateCell(cell)
				}
			})

			// Calculate all cells with dependencies on mount
			calculateCell(cell)
		})
	}

	onMount(() => {
		setupDependencyListeners()

		// Example listener for debugging
		document.addEventListener('cellchange', (ev) => {
			console.log('Cell changed', ev.detail.alias)
		})
	})

	// TODO: Clean up listeners on unmount
</script>

<h1 class="mb-4 text-2xl font-bold">{formTitle}</h1>

<ul class="my-4">
	<li>maxX: {maxX}</li>
	<li>maxY: {maxY}</li>
</ul>

<hr />

{#if formCells.length === 0 || cellValues.length === 0}
	<div class="alert alert-info">
		<p>No form selected. Try: <a href="?form=test1" class="link">?form=test1</a></p>
	</div>
{:else}
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
							<td class="align-top">
								{#if cell}
									<fieldset class="fieldset">
										{#if cell.type == FormCellType.INPUT}
											<input
												type="text"
												class="input"
												placeholder={cell.alias}
												bind:value={cellValues[y][x].value}
												oninput={(e) => handleCellChange(x, y, e.target.value)}
												onchange={(e) => handleCellChange(x, y, e.target.value)}
											/>
										{:else if [FormCellType.STATIC, FormCellType.SUM, FormCellType.FORMULA].includes(cell.type)}
											<input
												type="text"
												placeholder={cell.alias}
												class="input input-ghost"
												value={cellValues[y][x].value}
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

	<hr />

	<ul class="my-4">
		<li>cellValues: {JSON.stringify(cellValues)}</li>
	</ul>
{/if}
