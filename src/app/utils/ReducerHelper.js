import _ from 'lodash'
export class ReducerHelper {
    static mapSelectQuery = (list, columnName) => {
        let result = _.orderBy(list, columnName).reduce((r, e) => {
            r[e[columnName]] = e[columnName];
            return r;
        }, {});
        return result;
    }
}