import { error } from '@sveltejs/kit'

import type { PageLoad } from './$types'
import { forms } from '$lib/forms'
import type { FormCell } from '$lib/types'

export const load: PageLoad = ({ url }) => {
    const formId = url.searchParams.get('form') || 'test1'

    if (!forms[formId]) {
        error(404, 'Not found')
    }

    let cells: FormCell[] = forms[formId].cells || []
    let title: string = forms[formId].title || ''

    return { cells, title }
}
