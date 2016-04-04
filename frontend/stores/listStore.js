var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var ListStore = new Store(AppDispatcher);
var _lists = {};
var _currentList = null;

function resetList(list) {
  _lists[list.id] = list;
}

function resetLists(lists) {
  _lists = {};
  lists.forEach(function(listing, i) {
    resetList(listing);
  });
}

function setCurrent(list) {
  _currentList = list;
}

ListStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "RECEIVE_AND_SET":
      resetList(payload.list);
      setCurrent(payload.list);
      this.__emitChange();
      break;
    case "LISTS_RECEIVED":
      resetLists(payload.lists);
      this.__emitChange();
      break;
    case "CURRENT_LIST":
      setCurrent(payload.list);
      this.__emitChange();
      break;
  }
};

ListStore.all = function () {
  var lists = [];
  Object.keys(_lists).forEach(function(key){
    lists.push(_lists[key]);
  });
  return lists;
};

ListStore.returnCurrentList = function() {
  if (_currentList) {
    return _currentList.list;
  } else {
    return null;
  }
};

module.exports = ListStore;
