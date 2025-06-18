# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run all tests once
- `npm run test:unit` - Run tests in watch mode
- `npm run lint` - Check code formatting and linting
- `npm run format` - Format code with Prettier
- `npm run check` - Type check with svelte-check

## Database Commands

- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

## Architecture

This is a SvelteKit application that renders dynamic economic forms with calculated cells and dependencies.

### Core Components

- **Form System**: Dynamic spreadsheet-like forms defined in `src/lib/forms.ts` with configurable rows, columns, and cells
- **Cell Types**: Four types defined in `FormCellType` enum:
  - `INPUT` - User editable cells
  - `STATIC` - Read-only display cells
  - `SUM` - Auto-calculated sum of dependencies
  - `FORMULA` - Custom formula calculations (AVG, SUM, etc.) with validated syntax
- **Grid System**: Cell calculation engine in `src/lib/grid.ts` handles dependencies and formulas with security validation
- **Transaction System**: Pre-populated form data via `TransactionItem[]` linking transaction types/sources to values
- **Database**: Drizzle ORM with MySQL, minimal schema currently (just user table)

### Key Files

- `src/lib/types.ts` - Core type definitions including new `TransactionItem` and `FormItem` types
- `src/lib/forms.ts` - Form configurations with transaction data, including KTH economic form (31371) and test forms
- `src/routes/+page.svelte` - Main form renderer with reactive cell updates and transaction pre-population
- `src/routes/+page.ts` - Page loader that selects form by URL param (`?form=test1`)
- `src/lib/grid.ts` - Formula calculation with security validation (only allows SUM/AVG with cell references)
- `src/lib/formulas.ts` - Safe mathematical functions (SUM, AVG) used by formula evaluation
- `drizzle.config.ts` - Database configuration requiring DATABASE_URL env var

### Form Data Flow

1. Forms are defined statically in `forms.ts` with cell positions, types, dependencies, and transaction data
2. URL parameter (`?form=`) determines which form to load via `+page.ts`
3. Page component creates reactive `cellValues` 2D array, pre-populated from transaction data
4. Cell changes trigger custom events that propagate to dependent cells
5. Calculated cells (SUM/FORMULA) auto-update based on dependencies using validated formulas
6. Formula validation prevents unsafe eval() by only allowing `SUM({A1},{B1})` or `AVG({A1},{B1})` patterns

### Security Notes

- Formula evaluation uses strict validation to prevent code injection via `validateFormula()` function
- Only SUM and AVG functions are permitted with cell reference format `{A1}`

### Styling

Uses Tailwind CSS with DaisyUI components. Forms render as responsive tables with different input styles per cell type.
