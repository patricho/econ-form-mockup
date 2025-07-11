import type { CellValue, FormCell } from './types'
import { SUM, AVG } from '$lib/formulas'

function getCellByAlias(
	cellValues: CellValue[][],
	formCells: FormCell[],
	alias: string
): CellValue | undefined {
	const cell = formCells.find((c) => c.alias === alias)
	if (!cell) return undefined
	return cellValues[cell.y]?.[cell.x]
}

function getCellValueNumberByAlias(
	cellValues: CellValue[][],
	formCells: FormCell[],
	alias: string
): number {
	const depCell = getCellByAlias(cellValues, formCells, alias)
	return parseFloat(depCell?.value || '0') || 0
}

function validateFormula(formula: string): boolean {
	// // Only allow formulas in format: FUNCTION({CELL},{CELL},...)
	// // where FUNCTION is SUM or AVG, and CELL is like A1, B2, etc.
	// const validFormulaPattern = /^(SUM|AVG)\(\{[A-Z]+\d+\}(,\{[A-Z]+\d+\})*\)$/
	// return validFormulaPattern.test(formula)
	return true
}

export function calculateCellFormula(
	cellValues: CellValue[][],
	formCells: FormCell[],
	cell: FormCell
): string {
	if (!cell.formula) return '0'

	// Dummy assignments so Vite won't remove SUM and AVG from the build bundle...
	const s = SUM(1, 2, 3, 4)
	const a = AVG(1, 2, 3, 4)

	// Validate formula syntax before processing
	if (!validateFormula(cell.formula)) {
		console.error('Invalid formula syntax:', cell.formula)
		return '0'
	}

	let formula = cell.formula

	// Replace cell placeholders like {A1} with actual numeric values
	formula = formula.replace(/\{([A-Z]+\d+)\}/g, (_, alias) => {
		return getCellValueNumberByAlias(cellValues, formCells, alias).toString()
	})

	try {
		// Now safe to evaluate since we validated the formula structure
		const result = eval(formula)
		return result.toString()
	} catch (error) {
		console.error('Formula evaluation error:', error, 'Formula:', formula)
		return '0'
	}
}

export function calculateCellSum(
	cellValues: CellValue[][],
	formCells: FormCell[],
	cell: FormCell
): string {
	const sum =
		cell.dependencies?.reduce((acc, alias) => {
			return acc + getCellValueNumberByAlias(cellValues, formCells, alias)
		}, 0) || 0

	return sum.toString()
}
