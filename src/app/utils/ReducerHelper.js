import _ from 'lodash'
export class ReducerHelper {
    static mapSelectQuery = (list, columnName) => {
        return _.orderBy(list, columnName).reduce((r, e) => {
            r[e[columnName]] = e[columnName];
            return r;
        }, {})
    }
}