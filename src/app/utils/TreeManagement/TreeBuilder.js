import _ from 'lodash';
import TreeHelper from './TreeHelper';

let TreeOperationBuilder = function (tree, id, parentId) {
    let _tree = tree;

    return {
        getAllRelatedDataFromTreeById: function (_id) {
            return _.filter(_tree, (val) => {
                return val[id] === _id;
            })
        },
        getAllRelatedDataFromTreeByParentId: function (_parentId) {
            return _.filter(_tree, (val) => {
                return val[parentId] === _parentId;
            })
        },
        build: function () {
            return TreeHelper.transformToTree(tree, id, parentId);
        }
    }
}

export default TreeOperationBuilder;