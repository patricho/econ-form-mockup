# Database Structure for Economic Forms

This document describes the MySQL database structure needed to store all form entities, based on the
data found in `types.ts` and `forms.ts`.

## Table: `forms`

Stores the main form definitions.

| id    | title           | created_at          | updated_at          |
| ----- | --------------- | ------------------- | ------------------- |
| 31371 | Test Form 31371 | 2024-01-01 00:00:00 | 2024-01-01 00:00:00 |

```sql
CREATE TABLE forms (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Table: `transaction_type`

Stores transaction type definitions (salary costs, payroll overhead, etc.).

| id  | title                                 |
| --- | ------------------------------------- |
| 1   | Salary costs                          |
| 2   | Payroll overhead (LKP)                |
| 3   | other compensations (LKP not applied) |
| 4   | Direct salary costs                   |
| 5   | Running costs                         |
| 6   | Depreciation                          |
| 7   | Premises                              |
| 8   | Direct costs                          |
| 9   | Indirect cost                         |
| 10  | Sum                                   |

```sql
CREATE TABLE transaction_type (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
```

## Table: `transaction_source`

Stores transaction source definitions (funding sources, columns).

| id  | title                          |
| --- | ------------------------------ |
| 1   | Full costs estimated           |
| 2   | Co-funding required – deducted |
| 3   | Requested funding              |
| 4   | Conditions                     |

```sql
CREATE TABLE transaction_source (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
```

## Table: `form_rows`

Stores form row definitions with optional titles and transaction types.

| id  | form_id | row_index | title | type_id |
| --- | ------- | --------- | ----- | ------- |
| 5   | 31371   | 0         |       | 1       |
| 6   | 31371   | 1         |       | 2       |
| 7   | 31371   | 2         |       | 3       |
| 8   | 31371   | 3         |       | 4       |
| 9   | 31371   | 4         |       | 5       |
| 10  | 31371   | 5         |       | 6       |
| 11  | 31371   | 6         |       | 7       |
| 12  | 31371   | 7         |       | 8       |
| 13  | 31371   | 8         |       | 9       |
| 14  | 31371   | 9         |       | 10      |

```sql
CREATE TABLE form_rows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id VARCHAR(50) NOT NULL,
    row_index INT NOT NULL,
    title VARCHAR(255),
    type_id INT,
    FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES transaction_type(id),
    UNIQUE KEY unique_form_row (form_id, row_index)
);
```

## Table: `form_columns`

Stores form column definitions with optional titles and transaction sources.

| id  | form_id | column_index | title | source_id |
| --- | ------- | ------------ | ----- | --------- |
| 7   | 31371   | 0            |       | 1         |
| 8   | 31371   | 1            |       | 2         |
| 9   | 31371   | 2            |       | 3         |
| 10  | 31371   | 3            |       | 4         |

```sql
CREATE TABLE form_columns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id VARCHAR(50) NOT NULL,
    column_index INT NOT NULL,
    title VARCHAR(255),
    source_id INT,
    FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE,
    FOREIGN KEY (source_id) REFERENCES transaction_source(id),
    UNIQUE KEY unique_form_column (form_id, column_index)
);
```

## Table: `form_cells`

Stores cell definitions including position, type, and calculation rules.

The column `type` is an enum with the possible values `0=INPUT`, `1=STATIC`, `2=SUM`, `3=FORMULA`.

The relationships for `type_id` and `source_id` could be inferred from `form_rows` and
`form_columns` and left as `NULL` here, but defined here too for clarity. The columns exist here, so
it can be overridden if necessary. Defined here too for clarity.

| id  | form_id | x   | y   | alias | legend | type | type_id | source_id | dependencies               | formula                                                                        |
| --- | ------- | --- | --- | ----- | ------ | ---- | ------- | --------- | -------------------------- | ------------------------------------------------------------------------------ |
| 1   | 31371   | 0   | 0   | A1    |        | 0    | 1       | 1         |                            |                                                                                |
| 2   | 31371   | 1   | 0   | B1    |        | 0    | 1       | 2         |                            |                                                                                |
| 3   | 31371   | 2   | 0   | C1    |        | 2    | 1       | 3         | A1,B1                      |                                                                                |
| 4   | 31371   | 0   | 1   | A2    |        | 0    | 2       | 1         |                            |                                                                                |
| 5   | 31371   | 1   | 1   | B2    |        | 3    | 2       | 2         | A1,A2,B1                   | ({A2} / ( {A1} + {B1} ) > 0.5) ? Math.round(( {A1} + {B1} ) \* 0.5 - {A2}) : 0 |
| 6   | 31371   | 2   | 1   | C2    |        | 2    | 2       | 3         | A2,B2                      |                                                                                |
| 7   | 31371   | 3   | 1   | D2    |        | 3    | 2       | 4         | C1,C2                      | Math.round({C2}/{C1}\*100)                                                     |
| 8   | 31371   | 0   | 2   | A3    |        | 0    | 3       | 1         |                            |                                                                                |
| 9   | 31371   | 1   | 2   | B3    |        | 0    | 3       | 2         |                            |                                                                                |
| 10  | 31371   | 2   | 2   | C3    |        | 2    | 3       | 3         | A3,B3                      |                                                                                |
| 11  | 31371   | 0   | 3   | A4    |        | 2    | 4       | 1         | A1,A2,A3                   |                                                                                |
| 12  | 31371   | 1   | 3   | B4    |        | 2    | 4       | 2         | B1,B2,B3                   |                                                                                |
| 13  | 31371   | 2   | 3   | C4    |        | 2    | 4       | 3         | A4,B4                      |                                                                                |
| 14  | 31371   | 0   | 4   | A5    |        | 0    | 5       | 1         |                            |                                                                                |
| 15  | 31371   | 1   | 4   | B5    |        | 0    | 5       | 2         |                            |                                                                                |
| 16  | 31371   | 2   | 4   | C5    |        | 2    | 5       | 3         | A5,B5                      |                                                                                |
| 17  | 31371   | 0   | 5   | A6    |        | 0    | 6       | 1         |                            |                                                                                |
| 18  | 31371   | 1   | 5   | B6    |        | 0    | 6       | 2         |                            |                                                                                |
| 19  | 31371   | 2   | 5   | C6    |        | 2    | 6       | 3         | A6,B6                      |                                                                                |
| 20  | 31371   | 0   | 6   | A7    |        | 0    | 7       | 1         |                            |                                                                                |
| 21  | 31371   | 1   | 6   | B7    |        | 0    | 7       | 2         |                            |                                                                                |
| 22  | 31371   | 2   | 6   | C7    |        | 2    | 7       | 3         | A7,B7                      |                                                                                |
| 23  | 31371   | 0   | 7   | A8    |        | 2    | 7       | 1         | A4,A5,A6,A7                |                                                                                |
| 24  | 31371   | 1   | 7   | B8    |        | 2    | 7       | 2         | B4,B5,B6,B7                |                                                                                |
| 25  | 31371   | 2   | 7   | C8    |        | 2    | 7       | 3         | C4,C5,C6,C7                |                                                                                |
| 26  | 31371   | 0   | 8   | A9    |        | 0    | 9       | 1         |                            |                                                                                |
| 27  | 31371   | 1   | 8   | B9    |        | 0    | 9       | 2         |                            |                                                                                |
| 28  | 31371   | 2   | 8   | C9    |        | 2    | 9       | 3         | A9,B9                      |                                                                                |
| 29  | 31371   | 3   | 8   | D9    |        | 3    | 9       | 4         | C1,C2,C3,C4,C5,C6,C7,C8,C9 | Math.round(({C7}+{C9})/({C1}+{C2}+{C3}+{C5}+{C6}+{C7}+{C9})\*100)              |
| 30  | 31371   | 0   | 9   | A10   |        | 2    | 10      | 1         | A8,A9                      |                                                                                |
| 31  | 31371   | 1   | 9   | B10   |        | 2    | 10      | 2         | B8,B9                      |                                                                                |
| 32  | 31371   | 2   | 9   | C10   |        | 2    | 10      | 3         | C8,C9                      |                                                                                |
| 33  | 31371   | 3   | 9   | D10   |        | 2    | 10      | 4         | D2,D9                      |                                                                                |

```sql
CREATE TABLE form_cells (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id VARCHAR(50) NOT NULL,
    x INT NOT NULL,
    y INT NOT NULL,
    alias VARCHAR(10) NOT NULL,
    legend VARCHAR(255),
    type TINYINT NOT NULL, -- 0=INPUT, 1=STATIC, 2=SUM, 3=FORMULA
    type_id INT,
    source_id INT,
    dependencies JSON, -- Array of cell aliases
    formula TEXT,
    FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES transaction_type(id),
    FOREIGN KEY (source_id) REFERENCES transaction_source(id),
    UNIQUE KEY unique_form_cell_position (form_id, x, y),
    UNIQUE KEY unique_form_cell_alias (form_id, alias)
);
```

## Table: `transactions`

Stores actual transaction values that populate form cells.

| id  | form_id | type_id | source_id | value |
| --- | ------- | ------- | --------- | ----- |
| 3   | 31371   | 1       | 1         | 111   |
| 4   | 31371   | 1       | 2         | 222   |
| 5   | 31371   | 1       | 3         | 333   |

```sql
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id VARCHAR(50) NOT NULL,
    type_id INT NOT NULL,
    source_id INT NOT NULL,
    value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES transaction_type(id),
    FOREIGN KEY (source_id) REFERENCES transaction_source(id),
    UNIQUE KEY unique_transaction (form_id, type_id, source_id)
);
```
