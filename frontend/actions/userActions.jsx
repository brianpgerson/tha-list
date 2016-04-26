var AuthServerUtil = require('../util/authServerUtil');
var AppDispatcher = require('../dispatcher/dispatcher');

var UserActions = {

  // INBOUND

  receiveSearchedUsers: function(users){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_SEARCHED_USERS",
      users: users
    });
  },

  // OUTBOUND

  searchForUser: function(searchTerm){
    AuthServerUtil.searchUsers(searchTerm, UserActions.receiveSearchedUsers);
  },
};

module.exports = UserActions;
