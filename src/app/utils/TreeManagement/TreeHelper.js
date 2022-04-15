import _ from 'lodash';

export default class TreeHelper {

  static transformToTree = function transformToTree(arr, idField = 'id', parentIdField = 'parentId') {
    var nodes = {};
    return arr.filter(function (obj) {
      var id = obj[idField], parentId = obj[parentIdField];

      nodes[id] = _.defaults(obj, nodes[id], { subs: [] });
      parentId && (nodes[parentId] = (nodes[parentId] || { subs: [] }))["subs"].push(obj);

      return !parentId;
    });
  }

  static getAllRelatedDataFromTreeById = function getAllRelatedDataFromTreeById(arr, id) {
    return _.filter(arr, (val) => {
      return val.parentId === id;
    })
  }

  static Builder = (data) => {
    const findMainIds = () => {

    }
    return this;
  }
}