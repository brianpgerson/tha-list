var AppDispatcher = require('../dispatcher/dispatcher');
var ListServerApi = require('../util/listServerUtil');

var ListActions = {

  // ======INBOUND
  receiveAndSetCurrent: function(list){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_AND_SET",
      list: list
    });
  },

  receiveLists: function(lists) {
    AppDispatcher.dispatch({
      actionType: "LISTS_RECEIVED",
      lists: lists
    });
  },

  receiveCurrentList: function(list) {
    AppDispatcher.dispatch({
      actionType: "CURRENT_LIST",
      list: list
    });
  },

  // ======OUTBOUND
  getUserLists: function(userId) {
    ListServerApi.fetchLists(userId, ListActions.receiveLists);
  },

  setCurrentList: function(listId) {
    ListServerApi.setCurrentList(listId, ListActions.receiveCurrentList);
  },

  addList: function(listParams) {
    ListServerApi.addList(listParams, ListActions.receiveAndSetCurrent);
  },

  addUserList: function(userListParams) {
    ListServerApi.addUserList(userListParams);
  },

  deleteList: function(listId) {
    ListServerApi.deleteList(listId, ListActions.getUserLists);
  }

};

module.exports = ListActions;
