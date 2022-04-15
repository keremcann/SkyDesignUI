import React, { PureComponent } from 'react'
import filterFatory, { Comparator, customFilter, selectFilter, textFilter } from "react-bootstrap-table2-filter"
import { ReducerHelper } from "./ReducerHelper"

class SelectFilter extends React.Component {
    selecty;
    constructor(props) {
        super(props);

        this.selecty = <select
            key="select"
            ref={node => this.select = node}
            className="form-control"
            onChange={(e) => {
                this.props.onFilter(this.select.value);
            }}
            onClick={e => e.stopPropagation()}
        >
            <option value={''}>Please select one</option>
            {Object.entries(this.props.filterData).map(([key, value]) => {
                return <option value={key}>{value}</option>
            })}
        </select>;
    }

    // getSelectQueries() {
    //     return <select
    //         key="select"
    //         ref={node => this.select = node}
    //         className="form-control"
    //         onChange={this.onChange}
    //         onClick={e => e.stopPropagation()}
    //     >
    //         <option value={''}>Please select one</option>
    //         {Object.entries(this.props.filterData).map(([key, value]) => {
    //             return <option value={key}>{value}</option>
    //         })}
    //     </select>
    // }

    render() {
        return [
            this.selecty
        ];
    }
}

export class ColumnBuilder {
    result = {
        headerFormatter: function headerFormatter(column, colIndex, { sortElement, filterElement }) {
            return (
                <div className='hovered-title'>
                    <div>{column.text} {sortElement}</div>
                    {filterElement}
                </div>
            );
        }
    }
    constructor(dataField, text) {
        this.result.dataField = dataField;
        this.result.text = text;
    }

    sortable() {
        this.result = {
            ...this.result,
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<>•</>);
                else if (order === 'asc') return (<>▼</>);
                else if (order === 'desc') return (<>▲</>);
                return null;
            }
        }
        return this;
    }
    isIdField() {
        this.result.idField = true;
        return this;
    }
    isHidden() {
        this.result.hidden = true;
        return this;
    }
    withSelectFilter(data) {
        this.result = {
            ...this.result,
            // filter: customFilter(),
            // filterRenderer: (onFilter, column) =>
            //     <SelectFilter
            //         onFilter={onFilter}
            //         column={column}
            //         filterData={ReducerHelper.mapSelectQuery(data, this.result.dataField)} />

            filter: selectFilter({
                options: ReducerHelper.mapSelectQuery(data, this.result.dataField),
            })
        }
        return this;
    }
    withTextFilter(isExact = false) {
        this.result = {
            ...this.result,
            filter: textFilter(({
                delay: 0,
                ...isExact && { comparator: Comparator.EQ }
            }))
        }
        return this;
    }

    isDummyField = () => {
        this.result.isDummyField = true;
        return this;
    }

    withFormat(func = (cell, row, rowIndex, extraData) => { }) {
        this.result = {
            ...this.result,
            formatter: func
        }
        return this;
    }

    build() {
        return this.result;
    }
}