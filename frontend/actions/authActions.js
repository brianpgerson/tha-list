var AppDispatcher = require('../dispatcher/dispatcher');
var AuthServerApi = require('../util/authServerUtil');

var AuthActions = {

  //======= inbound/return
  receiveLoginCheck: function(sessionParams){
    AppDispatcher.dispatch({
      actionType: "CHECK_LOGIN",
      sessionParams: sessionParams
    });
  },

  receiveLoggedInUser: function(sessionParams) {
    AppDispatcher.dispatch({
      actionType: "LOGGED_IN",
      sessionParams: sessionParams
    });
  },

  receiveLoggedOutUser: function(sessionParams) {
    AppDispatcher.dispatch({
      actionType: "LOGGED_OUT",
      sessionParams: sessionParams
    });
  },


  //======= outbound/api
  checkLogin: function() {
    AuthServerApi.requestLoginCheck(AuthActions.receiveLoginCheck);
  },

  login: function(sessionParams) {
    debugger;
    AuthServerApi.requestLogin(sessionParams, AuthActions.receiveLoggedInUser);
  },

  logout: function(sessionParams) {
    AuthServerApi.requestLogout(sessionParams,
                                AuthActions.receiveLoggedOutUser);
  },

  signup: function(userParams) {
    var sessionParams = userParams;
    AuthServerApi.requestSignup(userParams,
                                AuthActions.receiveLoggedInUser,
                                sessionParams);
  }

};

module.exports = AuthActions;
