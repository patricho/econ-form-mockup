export type TransactionSource = {
	id: number
	title: string
}

export type TransactionType = {
	id: number
	title: string
}

export enum FormCellType {
	INPUT,
	STATIC,
	SUM,
	FORMULA
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

export type TransactionItem = {
	type: TransactionType
	src: TransactionSource
	value: string
}

export type FormItem = {
	title: string
	rows: FormRow[]
	columns: FormColumn[]
	cells: FormCell[]
	transactions: TransactionItem[]
}

export type FormRow = {
	title?: string
	transactionType?: TransactionType
}

export type FormColumn = {
	title?: string
	transactionSource?: TransactionSource
}
