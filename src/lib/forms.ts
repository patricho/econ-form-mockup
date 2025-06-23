import {
    FormCellType,
    type FormCell,
    type FormItem,
    type TransactionSource,
    type TransactionType
} from './types'

export const ttSalary: TransactionType = { id: 1, title: 'Salary costs' }
export const ttPayrol: TransactionType = { id: 2, title: 'Payroll overhead (LKP)' }
export const ttOtherC: TransactionType = { id: 3, title: 'other compensations (LKP not applied)' }
export const ttDirect: TransactionType = { id: 4, title: 'Direct salary costs' }
export const ttRunnin: TransactionType = { id: 5, title: 'Running costs' }
export const ttDeprec: TransactionType = { id: 6, title: 'Depreciation' }
export const ttPremis: TransactionType = { id: 7, title: 'Premises' }
export const ttDireco: TransactionType = { id: 8, title: 'Direct costs' }
export const ttIndire: TransactionType = { id: 9, title: 'Indirect cost' }
export const ttTotalS: TransactionType = { id: 10, title: 'Sum' }

export const tsFullCo: TransactionSource = { id: 1, title: 'Full costs estimated' }
export const tsCoFund: TransactionSource = { id: 2, title: 'Co-funding required – deducted' }
export const tsReques: TransactionSource = { id: 3, title: 'Requested funding' }
export const tsCondit: TransactionSource = { id: 4, title: 'Conditions' }

export const tsTestA: TransactionSource = { id: 1, title: 'A' }
export const tsTestB: TransactionSource = { id: 2, title: 'B' }
export const tsTestC: TransactionSource = { id: 3, title: 'C' }
export const tsTestD: TransactionSource = { id: 4, title: 'D' }
export const tsTestE: TransactionSource = { id: 5, title: 'E' }
export const tsTestF: TransactionSource = { id: 6, title: 'F' }

// prettier-ignore
export const forms: Record<string, FormItem> = {
    'test1': {
        title: 'POC Test Form 1',
        rows: [
            { title: '1', transactionType: ttSalary, },
            { title: '2', transactionType: ttPayrol, },
            { title: '3', transactionType: ttOtherC, },
            { title: '4', transactionType: ttDirect, },
        ],
        columns: [
            { title: 'A', transactionSource: tsTestA },
            { title: 'B', transactionSource: tsTestB },
            { title: 'C', transactionSource: tsTestC },
            { title: 'D', transactionSource: tsTestD },
            { title: 'E', transactionSource: tsTestE },
            { title: 'F', transactionSource: tsTestF },
        ],
        cells: [
            { x: 0, y: 0, alias: 'A1', type: FormCellType.INPUT } as FormCell,
            { x: 1, y: 0, alias: 'B1', type: FormCellType.INPUT } as FormCell,
            { x: 2, y: 0, alias: 'C1', type: FormCellType.INPUT } as FormCell,
            { x: 3, y: 0, alias: 'D1', type: FormCellType.INPUT } as FormCell,
            { x: 4, y: 0, alias: 'E1', type: FormCellType.SUM, legend: 'Column sum', dependencies: ['A1', 'B1', 'C1', 'D1'] } as FormCell,
            { x: 5, y: 0, alias: 'F1', type: FormCellType.FORMULA, legend: 'AVG(A1,B1,C1,D1)', dependencies: ['A1', 'B1', 'C1', 'D1'], formula: `SUM({A1},{B1},{C1},{D1})` } as FormCell,

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
        ] as FormCell[],
        transactions: [
            { type: ttPayrol, src: tsTestB, value: '666' }, // B2
            { type: ttPayrol, src: tsTestD, value: '222' }, // D2
        ]

    } as FormItem,
    '31371': {
        title: 'Test Form 31371',
        rows: [
            { transactionType: ttSalary, },
            { transactionType: ttPayrol, },
            { transactionType: ttOtherC, },
            { transactionType: ttDirect, },
            { transactionType: ttRunnin, },
            { transactionType: ttDeprec, },
            { transactionType: ttPremis, },
            { transactionType: ttDireco, },
            { transactionType: ttIndire, },
            { transactionType: ttTotalS, },
        ],
        columns: [
            { transactionSource: tsFullCo },
            { transactionSource: tsCoFund },
            { transactionSource: tsReques },
            { transactionSource: tsCondit },
        ],
        cells: [
            { x: 0, y: 0, alias: 'A1', type: FormCellType.INPUT, transactionType: ttSalary, transactionSource: tsFullCo } as FormCell,
            { x: 1, y: 0, alias: 'B1', type: FormCellType.INPUT, transactionType: ttSalary, transactionSource: tsCoFund } as FormCell,
            { x: 2, y: 0, alias: 'C1', type: FormCellType.SUM, transactionType: ttSalary, transactionSource: tsReques, dependencies: ['A1', 'B1'] } as FormCell,

            { x: 0, y: 1, alias: 'A2', type: FormCellType.INPUT, transactionType: ttPayrol, transactionSource: tsFullCo } as FormCell,
            { x: 1, y: 1, alias: 'B2', type: FormCellType.FORMULA, transactionType: ttPayrol, transactionSource: tsCoFund, dependencies: ['A1', 'A2', 'B1'], formula: `({A2} / ( {A1} + {B1} ) > 0.5) ? Math.round(( {A1} + {B1} ) * 0.5 - {A2}) : 0`, } as FormCell,
            { x: 2, y: 1, alias: 'C2', type: FormCellType.SUM, transactionType: ttPayrol, transactionSource: tsReques, dependencies: ['A2', 'B2'] } as FormCell,
            { x: 3, y: 1, alias: 'D2', type: FormCellType.FORMULA, transactionType: ttPayrol, transactionSource: tsCondit, dependencies: ['C1', 'C2'], formula: `Math.round({C2}/{C1}*100)` } as FormCell,

            { x: 0, y: 2, alias: 'A3', type: FormCellType.INPUT, transactionType: ttOtherC, transactionSource: tsFullCo } as FormCell,
            { x: 1, y: 2, alias: 'B3', type: FormCellType.INPUT, transactionType: ttOtherC, transactionSource: tsCoFund } as FormCell,
            { x: 2, y: 2, alias: 'C3', type: FormCellType.SUM, transactionType: ttOtherC, transactionSource: tsReques, dependencies: ['A3', 'B3'] } as FormCell,

            { x: 0, y: 3, alias: 'A4', type: FormCellType.SUM, transactionType: ttDirect, transactionSource: tsFullCo, dependencies: ['A1', 'A2', 'A3'] } as FormCell,
            { x: 1, y: 3, alias: 'B4', type: FormCellType.SUM, transactionType: ttDirect, transactionSource: tsCoFund, dependencies: ['B1', 'B2', 'B3'] } as FormCell,
            { x: 2, y: 3, alias: 'C4', type: FormCellType.SUM, transactionType: ttDirect, transactionSource: tsReques, dependencies: ['A4', 'B4'] } as FormCell,

            { x: 0, y: 4, alias: 'A5', type: FormCellType.INPUT, transactionType: ttRunnin, transactionSource: tsFullCo } as FormCell,
            { x: 1, y: 4, alias: 'B5', type: FormCellType.INPUT, transactionType: ttRunnin, transactionSource: tsCoFund } as FormCell,
            { x: 2, y: 4, alias: 'C5', type: FormCellType.SUM, transactionType: ttRunnin, transactionSource: tsReques, dependencies: ['A5', 'B5'] } as FormCell,

            { x: 0, y: 5, alias: 'A6', type: FormCellType.INPUT, transactionType: ttDeprec, transactionSource: tsFullCo } as FormCell,
            { x: 1, y: 5, alias: 'B6', type: FormCellType.INPUT, transactionType: ttDeprec, transactionSource: tsCoFund } as FormCell,
            { x: 2, y: 5, alias: 'C6', type: FormCellType.SUM, transactionType: ttDeprec, transactionSource: tsReques, dependencies: ['A6', 'B6'] } as FormCell,

            { x: 0, y: 6, alias: 'A7', type: FormCellType.INPUT, transactionType: ttPremis, transactionSource: tsFullCo } as FormCell,
            { x: 1, y: 6, alias: 'B7', type: FormCellType.INPUT, transactionType: ttPremis, transactionSource: tsCoFund } as FormCell,
            { x: 2, y: 6, alias: 'C7', type: FormCellType.SUM, transactionType: ttPremis, transactionSource: tsReques, dependencies: ['A7', 'B7'] } as FormCell,

            { x: 0, y: 7, alias: 'A8', type: FormCellType.SUM, transactionType: ttPremis, transactionSource: tsFullCo, dependencies: ['A4', 'A5', 'A6', 'A7'] } as FormCell,
            { x: 1, y: 7, alias: 'B8', type: FormCellType.SUM, transactionType: ttPremis, transactionSource: tsCoFund, dependencies: ['B4', 'B5', 'B6', 'B7'] } as FormCell,
            { x: 2, y: 7, alias: 'C8', type: FormCellType.SUM, transactionType: ttPremis, transactionSource: tsReques, dependencies: ['C4', 'C5', 'C6', 'C7'] } as FormCell,

            { x: 0, y: 8, alias: 'A9', type: FormCellType.INPUT, transactionType: ttIndire, transactionSource: tsFullCo } as FormCell,
            { x: 1, y: 8, alias: 'B9', type: FormCellType.INPUT, transactionType: ttIndire, transactionSource: tsCoFund } as FormCell,
            { x: 2, y: 8, alias: 'C9', type: FormCellType.SUM, transactionType: ttIndire, transactionSource: tsReques, dependencies: ['A9', 'B9'] } as FormCell,
            { x: 3, y: 8, alias: 'D9', type: FormCellType.FORMULA, transactionType: ttIndire, transactionSource: tsCondit, dependencies: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'], formula: `Math.round(({C7}+{C9})/({C1}+{C2}+{C3}+{C5}+{C6}+{C7}+{C9})*100)` } as FormCell,

            { x: 0, y: 9, alias: 'A10', type: FormCellType.SUM, transactionType: ttTotalS, transactionSource: tsFullCo, dependencies: ['A8', 'A9'] } as FormCell,
            { x: 1, y: 9, alias: 'B10', type: FormCellType.SUM, transactionType: ttTotalS, transactionSource: tsCoFund, dependencies: ['B8', 'B9'] } as FormCell,
            { x: 2, y: 9, alias: 'C10', type: FormCellType.SUM, transactionType: ttTotalS, transactionSource: tsReques, dependencies: ['C8', 'C9'] } as FormCell,
            { x: 3, y: 9, alias: 'D10', type: FormCellType.SUM, transactionType: ttTotalS, transactionSource: tsCondit, dependencies: ['D2', 'D9'] } as FormCell,
        ],
        transactions: [
            // Prepopulate with transaction data, as if from the database
            { type: ttSalary, src: tsFullCo, value: '111' }, // A1
            { type: ttSalary, src: tsCoFund, value: '222' }, // B1
            { type: ttSalary, src: tsReques, value: '333' }, // C1
        ],
    },
    '31375': {
        title: 'Test Form 31375',
        rows: [
            /* 0 */ { title: 'Ingående balansposter', },
            /* 1 */ { title: 'INCOME' },
            /* 2 */ { title: 'Intäkter av anslag', },
            /* 3 */ { title: 'Intäkter av avgifter och andra ersättningar' },
            /* 4 */ { title: 'Intäkter av externa användaravgifter', },
            /* 5 */ { title: 'Bidrag, exkl. bidrag från KTH' },
            /* 6 */ { title: 'Bidrag SFO, transfererade från KTH' },
            /* 7 */ { title: 'Periodiserade bidrag (överskott/oförbrukat=kreditbelopp)' },
            /* 8 */ { title: 'Finansiella intäkter' },
            /* 9 */ { title: 'SUM INCOME' },
            /* 10 */ { title: 'Information' },
            /* 11 */ { title: 'COST' },
            /* 12 */ { title: 'Personalkostnader', },
            /* 13 */ { title: 'Lokalkostnader', },
            /* 14 */ { title: 'Övriga driftskostnader', },
            /* 15 */ { title: 'Indirekta kostnader', },
            /* 16 */ { title: 'Finansiella kostnader', },
            /* 17 */ { title: 'Avskrivningar och nedskrivningar', },
            /* 18 */ { title: 'SUM COST', },
            /* 19 */ { title: 'BALANCE', },
            /* 20 */ { title: 'Framtida avskrivningskostnader', },
            /* 21 */ { title: 'KVAR ATT DISPONERA', },
            /* 10 */ { title: 'Information' },
            /* 22 */ { title: 'TRANSFERERINGAR', },
            /* 23 */ { title: 'Medel som erhållits fr statens budget för finansiering av bidrag' },
            /* 24 */ { title: 'Övriga medel som erhållits för finansieringer av bidrag' },
            /* 25 */ { title: 'Lämnade bidrag' },
            /* 26 */ { title: 'SUM' },
        ],
        columns: [
            { title: 'Unit' },
        ],
        cells: [
            { x: 0, y: 0, alias: 'A1', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 1, alias: 'A2', type: FormCellType.STATIC, value: '' } as FormCell,
            { x: 0, y: 2, alias: 'A3', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 3, alias: 'A4', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 4, alias: 'A5', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 5, alias: 'A6', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 6, alias: 'A7', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 7, alias: 'A8', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 8, alias: 'A9', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 9, alias: 'A10', type: FormCellType.SUM, dependencies: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'], } as FormCell,
            { x: 0, y: 10, alias: 'A11', type: FormCellType.STATIC, value: 'Information...' } as FormCell,
            { x: 0, y: 11, alias: 'A12', type: FormCellType.STATIC, value: '' } as FormCell,
            { x: 0, y: 12, alias: 'A13', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 13, alias: 'A14', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 14, alias: 'A15', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 15, alias: 'A16', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 16, alias: 'A17', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 17, alias: 'A18', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 18, alias: 'A19', type: FormCellType.SUM, dependencies: ['A13', 'A14', 'A15', 'A16', 'A17', 'A18'], } as FormCell,
            { x: 0, y: 19, alias: 'A20', type: FormCellType.FORMULA, dependencies: ['A10', 'A19'], formula: `{A10}-{A19}` } as FormCell,
            { x: 0, y: 20, alias: 'A21', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 21, alias: 'A22', type: FormCellType.FORMULA, dependencies: ['A1', 'A8', 'A20', 'A21'], formula: `{A1} - {A8} + {A20} - {A21} ` } as FormCell,
            { x: 0, y: 22, alias: 'A23', type: FormCellType.STATIC, value: 'Information...' } as FormCell,
            { x: 0, y: 23, alias: 'A24', type: FormCellType.STATIC, value: '' } as FormCell,
            { x: 0, y: 24, alias: 'A25', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 25, alias: 'A26', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 26, alias: 'A27', type: FormCellType.INPUT, } as FormCell,
            { x: 0, y: 27, alias: 'A28', type: FormCellType.SUM, dependencies: ['A25', 'A26', 'A27'] } as FormCell,
        ],
        transactions: [
        ],
    },
}
