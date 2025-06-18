export enum FormCellType {
	INPUT,
	STATIC,
	SUM,
	FORMULA
}

export type TransactionSource = {
	id: number
	title: string
}

export type TransactionType = {
	id: number
	title: string
}

export type FormCell = {
	id: number
	x: number
	y: number
	alias: string
	legend: string
	type: FormCellType
	transactionType?: TransactionType
	transactionSource?: TransactionSource
	dependencies?: string[]
	formula?: string
}

export type CellValue = {
	value: string
	cell: FormCell
}
