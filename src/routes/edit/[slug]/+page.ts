import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { forms, ttSalary, ttPayrol, ttOtherC, ttDirect, ttRunnin, ttDeprec, ttPremis, ttDireco, ttIndire, ttTotalS, tsFullCo, tsCoFund, tsReques, tsCondit } from '$lib/forms'
import type { FormCell, FormColumn, FormRow, TransactionItem, TransactionType, TransactionSource } from '$lib/types'

export const prerender = true

export const load: PageLoad = ({ params }) => {
    const formId = params.slug
    
    if (!forms[formId]) {
        throw error(404, `Form "${formId}" not found`)
    }
    
    let cells: FormCell[] = forms[formId].cells || []
    let rows: FormRow[] = forms[formId].rows || []
    let columns: FormColumn[] = forms[formId].columns || []
    let transactions: TransactionItem[] = forms[formId].transactions || []
    let title: string = forms[formId].title || ''

    // Provide all available transaction types and sources for selects
    const transactionTypes: TransactionType[] = [
        ttSalary, ttPayrol, ttOtherC, ttDirect, ttRunnin, 
        ttDeprec, ttPremis, ttDireco, ttIndire, ttTotalS
    ]
    
    const transactionSources: TransactionSource[] = [
        tsFullCo, tsCoFund, tsReques, tsCondit
    ]

    return { 
        cells, 
        rows, 
        columns, 
        transactions, 
        title, 
        transactionTypes, 
        transactionSources 
    }
}

// Export all available form IDs for prerendering
export async function entries() {
    return Object.keys(forms).map(formId => ({ slug: formId }))
}