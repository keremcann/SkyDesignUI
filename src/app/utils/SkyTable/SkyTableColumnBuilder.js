import { NumberRangeColumnFilter, SelectColumnFilter, SliderColumnFilter } from './SkyTable';

export default class SkyTableColumnBuilder {
    result = {}
    constructor(dataField, text) {
        this.result.accessor = dataField;
        this.result.Header = text;
    }

    isIdColumn(isHidden = false) {
        this.result = {
            ...this.result,
            ...isHidden && { show: false }
        }
        return this;
    }

    withSelectFilter() {
        this.result = {
            ...this.result,
            Filter: SelectColumnFilter
        }
        return this;
    }
    withTextFilter(isExact = false) {
        this.result = {
            ...this.result,
            ...isExact === true ? { filter: 'fuzzyText' } : { filter: 'include', }
        }
        return this;
    }
    withSliderFilter() {
        this.result = {
            ...this.result,
            Filter: SliderColumnFilter
        }
        return this;
    }
    withNumberRangeFilter() {
        this.result = {
            ...this.result,
            Filter: NumberRangeColumnFilter,
            filter: 'between',
        }
        return this;
    }

    withFormat(func = ({ row }) => { }) {
        this.result = {
            ...this.result,
            Cell: func
        }
        return this;
    }

    build() {
        return this.result;
    }
}