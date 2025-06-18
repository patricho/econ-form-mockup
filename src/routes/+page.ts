import type { PageLoad } from './$types'
import { forms } from '$lib/forms'
import type { FormCell, FormColumn, FormRow, TransactionItem } from '$lib/types'

export const load: PageLoad = ({ url }) => {
	// let formId = url.searchParams.get('form') || 'test1'
	//
	// if (!forms[formId]) {
	//     formId = 'test1'
	// }
	//
	// let cells: FormCell[] = forms[formId].cells || []
	// let rows: FormRow[] = forms[formId].rows || []
	// let columns: FormColumn[] = forms[formId].columns || []
	// let transactions: TransactionItem[] = forms[formId].transactions || []
	// let title: string = forms[formId].title || ''
	//
	// return { cells, rows, columns, transactions, title }
}
