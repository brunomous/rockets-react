# Table

The Table component is a composition of parts that render the table itself, custom rows/columns and pagination.

## Example

```tsx
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@concepta/react-material-ui';

const tableTheme = createTableStyles({
  table: {
    height: '100%',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'auto',
  },
  tableHeader: {
    ...theme.typography.caption,
    lineHeight: 1,
    fontWeight: 500,
    color: theme.palette.grey[500],
  },
  tableRow: {
    backgroundColor: '#F9FAFB',
    textTransform: 'uppercase',
  },
  tableContainer: {
    flex: 1,
  },
});

<Table.Root rows={rows} headers={headers} sx={tableTheme.root}>
  <TableContainer sx={tableTheme.tableContainer}>
    <Table.Table stickyHeader variant="outlined" sx={tableTheme.table}>
      <TableHead>
        <TableRow sx={tableTheme.tableRow}>
          <Table.HeaderCells sx={tableTheme.tableHeader} />
        </TableRow>
      </TableHead>
      <TableBody>
        <Table.BodyRows
          renderRow={(row) => (
            <Table.BodyRow row={row} hasCheckboxes={false} hover={false}>
              <Table.BodyCell row={row} />
            </Table.BodyRow>
          )}
        />
      </TableBody>
    </Table.Table>
  </TableContainer>
  <Table.Pagination variant="outlined" />
</Table.Root>;
```

## Table.Root

The Root is the highest component of the tree and holds the context to share state. It can function as either a controlled or uncontrolled component. When passing a _tableQueryState_ to Root, it indicates the intention to control the table's state. This is particularly helpful when managing data externally and requiring full control. Root intelligently enforces the requirement of total, pageCount, and _updateTableQueryState_ if any of these props are provided. In the absence of these props, the component remains uncontrolled, and the state is managed by the Table component.

### Props

| Name                  | Type       | Description                                                                 | Optional |
| --------------------- | ---------- | --------------------------------------------------------------------------- | -------- |
| rows                  | `object[]` | List of objects containing information related to the table rows.           | No       |
| headers               | `object[]` | List of objects containing information related to the table column headers. | No       |
| total                 | `number`   | Quantity of rows displayed by the table, non related to pagination.         | Yes      |
| pageCount             | `number`   | Quantity of pages rendered on the table.                                    | Yes      |
| tableQueryState       | `object`   | Information related to the current state of the table.                      | Yes      |
| updateTableQueryState | `function` | Handler for updating the current state of the table.                        | Yes      |

## TableContainer

The TableContainer is a div that serves as a wrapper for the Table component.

### Props

> All TableContainer props extend from [Material UI's `TableContainer`](https://mui.com/material-ui/api/table-container/).

## Table.Table

Table is the component that renders the _table_ tag per se.

### Props

| Name    | Type     | Description                                                                               | Optional |
| ------- | -------- | ----------------------------------------------------------------------------------------- | -------- |
| variant | `string` | Identifier for the variant of the table, being one of _clean_, _contained_ or _outlined_. | Yes      |

> The rest of the Table props extend from [Material UI's `Table`](https://mui.com/material-ui/api/table/).

## TableHead

The TableHead component serves as a wrapper for the column headers of the table.

### Props

> All TableHead props extend from [Material UI's `TableHead`](https://mui.com/material-ui/api/table-head/).

## TableRow

The TableRow component serves as a wrapper for each _cell_ displayed on a table row.

### Props

> All TableRow props extend from [Material UI's `TableRow`](https://mui.com/material-ui/api/table-row/).

## Table.HeaderCells

Custom wrapper for the table header cells.

### Props

| Name       | Type       | Description                                                      | Optional |
| ---------- | ---------- | ---------------------------------------------------------------- | -------- |
| renderCell | `function` | Handler for the custom node displayed on each table header cell. | Yes      |

## TableBody

The TableBody component serves as a wrapper for the rows of the table.

### Props

> All TableBody props extend from [Material UI's `TableBody`](https://mui.com/material-ui/api/table-body/).

## Table.BodyRows

Lorem ipsum dolor sit amet

### Props

| Name      | Type       | Description                                              | Optional |
| --------- | ---------- | -------------------------------------------------------- | -------- |
| renderRow | `function` | Handler for the custom node displayed on each table row. | Yes      |
| isLoading | `boolean`  | Flag for a loading state on the table rows.              | Yes      |

## Table.BodyRow

Lorem ipsum dolor sit amet

### Props

| Name          | Type      | Description                                                          | Optional |
| ------------- | --------- | -------------------------------------------------------------------- | -------- |
| row           | `object`  | Information from the data displayed on the table row.                | Yes      |
| hasCheckboxes | `boolean` | Flag to identify if the table rows can be selected for bulk actions. | Yes      |

> The rest of the TableBodyRow props extend from [Material UI's `TableRow`](https://mui.com/material-ui/api/table-row/).

## Table.BodyCell

Custom wrapper for the table body cells.

### Props

| Name | Type     | Description                                             | Optional |
| ---- | -------- | ------------------------------------------------------- | -------- |
| row  | `object` | Object containing information related to the table row. | No       |

> The rest of the TableBodyCell props extend from [Material UI's `TableCell`](https://mui.com/material-ui/api/table-cell/).

## TablePagination

The TablePagination component serves as a wrapper for the page actions of the table.

### Props

| Name    | Type     | Description                                                                                            | Optional |
| ------- | -------- | ------------------------------------------------------------------------------------------------------ | -------- |
| variant | `string` | Identifier for the variant of the pagination wrapper, being one of _clean_, _contained_ or _outlined_. | Yes      |

> The rest of the TablePagination props extend from [Material UI's `TablePagination`](https://mui.com/material-ui/api/table-pagination/).

## Hooks

`useTable` now uses the `useTableQueryState` hook, creating a state object to manage pagination, filtering, and sorting. Importantly, `useTable` is now decoupled from the Table component and can function independently. It implements the same interface for the query state and can receive an initial state, or if one is not provided, it will utilize the default `useTableQueryState` settings. It exposes the fetched data, the current state, and provides methods for updating the state.

Every component now includes JSDocs, and even some inner functions have JSDocs as well.
