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

This is a SvelteKit application that renders dynamic economic forms with calculated cells and dependencies. Configured for static site generation with GitHub Pages deployment.

### Route Structure

- `/` - Form selection page with cards for each available form
- `/form/[slug]/` - Form viewer (e.g., `/form/test1`, `/form/31371`)  
- `/edit/[slug]/` - Form editor interface with expandable controls

### Core Components

- **Form System**: Dynamic spreadsheet-like forms defined in `src/lib/forms.ts` with configurable rows, columns, and cells
- **Cell Types**: Four types defined in `FormCellType` enum:
  - `INPUT` - User editable cells
  - `STATIC` - Read-only display cells  
  - `SUM` - Auto-calculated sum of dependencies
  - `FORMULA` - Custom formula calculations with validated syntax (restricted to safe patterns)
- **Grid System**: Cell calculation engine in `src/lib/grid.ts` handles dependencies and formulas with security validation
- **Transaction System**: Pre-populated form data via `TransactionItem[]` linking transaction types/sources to values
- **Edit Interface**: Form structure editor with toggle between compact and expanded modes
- **Database**: Drizzle ORM with MySQL, complete schema design documented in `DATA_STRUCTURE.md`

### Key Files

- `src/lib/types.ts` - Core type definitions including `TransactionItem`, `FormItem`, and cell types
- `src/lib/forms.ts` - Form configurations with transaction data (forms 31371 and test1)
- `src/lib/grid.ts` - Formula calculation with security validation (prevents code injection)
- `src/lib/formulas.ts` - Safe mathematical functions (SUM, AVG) used by formula evaluation
- `src/routes/form/[slug]/` - Form viewer with slug-based routing and prerendering
- `src/routes/edit/[slug]/` - Form editor interface with expandable controls
- `DATA_STRUCTURE.md` - Complete MySQL database schema with sample data
- `static/.nojekyll` - Required for GitHub Pages to serve files with underscores

### Form Data Flow

1. Forms are defined statically in `forms.ts` with cell positions, types, dependencies, and transaction data
2. Slug parameters determine which form to load via parameterized routes
3. `entries()` functions enable static prerendering of all form routes
4. Page components create reactive `cellValues` 2D array, pre-populated from transaction data
5. Cell changes trigger custom events that propagate to dependent cells
6. Calculated cells (SUM/FORMULA) auto-update based on dependencies using validated formulas

### Static Site Generation

- Uses `@sveltejs/adapter-static` configured to output to `docs/` directory
- GitHub Pages serves from `docs/` folder (required by GitHub Pages)
- `.nojekyll` file prevents Jekyll processing (required for SvelteKit assets)
- All routes prerendered via `entries()` functions in `+page.ts` files

### Security Notes

- Formula evaluation uses strict validation via `validateFormula()` to prevent code injection
- Only SUM/AVG functions permitted with cell reference format `{A1}`
- Complex formulas in form 31371 bypass validation (legacy) but are isolated to eval context

### Database Design

Complete MySQL schema documented in `DATA_STRUCTURE.md` including:
- Forms, transaction types/sources, form rows/columns/cells, and transaction data
- All 33 cells from form 31371 mapped with dependencies and formulas
