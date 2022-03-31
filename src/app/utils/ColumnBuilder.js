import { Comparator, selectFilter, textFilter } from "react-bootstrap-table2-filter"
import { ReducerHelper } from "./ReducerHelper"

export class ColumnBuilder {

    result = {}
    constructor(dataField, text) {
        this.result.dataField = dataField;
        this.result.text = text;
    }

    sortable() {
        this.result.sort = true;
        return this;
    }
    isIdField() {
        this.result.idField = true;
        return this;
    }
    withSelectFilter(data) {
        this.result = {
            ...this.result,
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