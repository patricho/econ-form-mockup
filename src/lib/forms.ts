import { FormCellType, type FormCell } from './types'

export type FormItem = {
	title: string
	cells: FormCell[]
}

// prettier-ignore
export const forms: Record<string, FormItem> = {
	"test1": {
		title: "Test Form 1",
		cells: [
			{ x: 0, y: 0, alias: 'A1', type: FormCellType.INPUT } as FormCell,
			{ x: 1, y: 0, alias: 'B1', type: FormCellType.INPUT } as FormCell,
			{ x: 2, y: 0, alias: 'C1', type: FormCellType.INPUT } as FormCell,
			{ x: 3, y: 0, alias: 'D1', type: FormCellType.INPUT } as FormCell,
			{ x: 4, y: 0, alias: 'E1', type: FormCellType.SUM, legend: 'Column sum', dependencies: ['A1', 'B1', 'C1', 'D1'] } as FormCell,
			{ x: 5, y: 0, alias: 'F1', type: FormCellType.FORMULA, legend: 'AVG(A1,B1,C1,D1)', dependencies: ['A1', 'B1', 'C1', 'D1'], formula: `AVG({A1},{B1},{C1},{D1})` } as FormCell,

			{ x: 0, y: 1, alias: 'A2', type: FormCellType.INPUT } as FormCell,
			{ x: 1, y: 1, alias: 'B2', type: FormCellType.STATIC, legend: 'Static cell' } as FormCell,
			{ x: 2, y: 1, alias: 'C2', type: FormCellType.INPUT } as FormCell,
			{ x: 3, y: 1, alias: 'D2', type: FormCellType.INPUT } as FormCell,
			{ x: 4, y: 1, alias: 'E2', type: FormCellType.SUM, legend: 'Column sum', dependencies: ['A2', 'B2', 'C2', 'D2'] } as FormCell,

			{ x: 0, y: 2, alias: 'A3', type: FormCellType.SUM, legend: 'Row sum', dependencies: ['A1', 'A2'] } as FormCell,
			{ x: 1, y: 2, alias: 'B3', type: FormCellType.SUM, legend: 'Row sum', dependencies: ['B1', 'B2'] } as FormCell,
			{ x: 2, y: 2, alias: 'C3', type: FormCellType.SUM, legend: 'Row sum', dependencies: ['C1', 'C2'] } as FormCell,
			{ x: 3, y: 2, alias: 'D3', type: FormCellType.SUM, legend: 'Row sum', dependencies: ['D1', 'D2'] } as FormCell,
			{ x: 4, y: 2, alias: 'E3', type: FormCellType.SUM, legend: 'Total sum', dependencies: ['E1', 'E2'] } as FormCell,

			{ x: 0, y: 3, alias: 'A4', type: FormCellType.FORMULA, legend: 'AVG(A1,A2)', dependencies: ['A1', 'A2'], formula: `AVG({A1},{A2})` } as FormCell,
			{ x: 1, y: 3, alias: 'B4', type: FormCellType.FORMULA, legend: 'SUM(A1,C1,D2)', dependencies: ['A1', 'C1', 'D2'], formula: `SUM({A1},{C1},{D2})` } as FormCell
		] as FormCell[]
	} as FormItem
}
