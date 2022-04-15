import React from 'react'
import styled from 'styled-components'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table'
import { matchSorter } from 'match-sorter'
import _ from 'lodash'
import CustomSelectInput from '../../common/form/CustomSelectInput';

import Select, { components } from 'react-select';
const { Option } = components;

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                className='form-control'
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                onClick={e => e.stopPropagation()}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className='form-control'
            style={{ minWidth: '80px' }}
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            onClick={e => e.stopPropagation()}
            placeholder={`Search...`}
        />
    )
}

export const SelectColumnFilter = function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])
    return (

        // <Select
        //     components={{
        //         Input: CustomSelectInput,
        //         Option: (props) => {
        //             console.log(props)

        //             return (
        //                 <Option {...props} key={props.data}>
        //                     {props.data}
        //                 </Option>
        //             )
        //         }
        //     }}
        //     className="react-select"
        //     // className='form-control'
        //     classNamePrefix="react-select"
        //     name="form-field-name"
        //     value={filterValue}
        //     onChange={text => {
        //         setFilter(text || undefined)
        //     }}
        //     onClick={e => e.stopPropagation()}
        //     options={options}
        // />


        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            onClick={e => e.stopPropagation()}
            className='form-control'
        >
            <option value="">All</option>
            {_.orderBy(options, filterValue).map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export const SliderColumnFilter = function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <>
            <input

                className='form-control'
                onClick={e => e.stopPropagation()}
                type="range"
                min={min}
                max={max}
                value={filterValue || min}
                onChange={e => {
                    setFilter(parseInt(e.target.value, 10))
                }}
            />
            <button onClick={() => setFilter(undefined)}>Off</button>
        </>
    )
}

export const NumberRangeColumnFilter = function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <input
                value={filterValue[0] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
                }}
                placeholder={`Min (${min})`}
                style={{
                    width: '70px',
                    marginRight: '0.5rem',
                }}
            />
            to
            <input
                value={filterValue[1] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
                }}
                placeholder={`Max (${max})`}
                style={{
                    width: '70px',
                    marginLeft: '0.5rem',
                }}
            />
        </div>
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = val => !val

function SkyTable({ columns, data, onRowSelected = (row) => { } }) {
    const filterTypes = React.useMemo(
        () => ({
            fuzzyText: fuzzyTextFilterFn,
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        rows,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,

    } = useTable(
        {
            data,
            columns,
            defaultColumn,
            filterTypes,
            initialState: {
                hiddenColumns: columns.map(column => {
                    if (column.show === false) return column.accessor || column.id;
                }),
            },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    const firstPageRows = rows.slice(0, 10)

    return (
        <div style={{ overflow: 'auto' }}>
            <table {...getTableProps()} className='table table-bordered'>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <>

                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')} <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' ▲'
                                                    : ' ▼'
                                                : ''}
                                        </span>
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>

                                    </th>
                                </>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <th
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: 'left',
                            }}
                        >
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} onClick={() => {
                                onRowSelected(row.original);
                                console.log(row)
                                alert(JSON.stringify(row.original))
                            }} style={{
                                backgroundColor: !row.isSelected ? "transparent" : "black",
                            }}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            <div className="row pagination">
                <div className='col-md-6' style={{ display: 'flex', alignItems: 'center', gap: '38px' }}>

                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page:{' '}
                        <input
                            type="number"
                            className='form-control'
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>
                    <span>
                        | Row per page:{' '}
                        <select
                            value={pageSize}
                            className='form-control'
                            style={{ maxWidth: '200px' }}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </span>

                </div>
                <div className='col-md-6' style={{ display: 'flex', justifyContent: 'right' }}>
                    <button className='page-item page-link' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button className='page-item page-link' onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    <button className='page-item page-link' onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <button className='page-item page-link' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}
                </div>
            </div>



            <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div>
        </div>
    )
}

function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

filterGreaterThan.autoRemove = val => typeof val !== 'number'

export default SkyTable;