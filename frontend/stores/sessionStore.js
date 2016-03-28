var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _sessionState = {
  sessionToken: null,
  username: null,
  userId: null,
  createdAt: null
};

var _userInfo = {};

var SessionStore = new Store(AppDispatcher);

function setSessionState(sessionParams){
  _sessionState['sessionToken'] = sessionParams['session_token'];
  _sessionState['username'] = sessionParams['username'];
  _sessionState['userId'] = sessionParams['id'];
  _sessionState['createdAt'] = sessionParams['created_at'];
}

function setUserInfo(userParams){
  _userInfo = userParams;
}

SessionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "CHECK_LOGIN":
    setSessionState(payload.sessionParams);
    this.__emitChange();
    break;
  case "LOGGED_IN":
    setSessionState(payload.sessionParams);
    this.__emitChange();
    break;
  case "LOGGED_OUT":
    setSessionState(payload.sessionParams);
    this.__emitChange();
    break;
  case "RECEIVE_USER_INFO":
    setUserInfo(payload.userParams);
    this.__emitChange();
    break;
  }
};

SessionStore.returnCurrentUser = function() {
  return {
    username: _sessionState.username,
    userId: _sessionState.userId,
    createdAt: _sessionState.createdAt
  };
};

SessionStore.getUserId = function() {
  return _sessionState.userId;
};

SessionStore.isLoggedIn = function() {
  return (_sessionState.sessionToken !== null);
};



module.exports = SessionStore;
