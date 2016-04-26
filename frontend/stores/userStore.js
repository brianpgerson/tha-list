var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _users = [];

var UserStore = new Store(AppDispatcher);

function setUsers(users){
  _users = users;
}

UserStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "RECEIVE_SEARCHED_USERS":
    setUsers(payload.users);
    this.__emitChange();
    break;
  }
};

UserStore.all = function(){
  return _users.slice();
};

module.exports = UserStore;
