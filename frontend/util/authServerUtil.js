var ErrorActions = require('../actions/errorActions');

var AuthServerApi = {
  requestLoginCheck: function(callback){
    $.ajax({
      url: "api/session/auth",
      type: "GET",
      data: {},
      success: function(data){
        callback(data);
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  requestLogin: function(formData, callback){
    $.ajax({
      url: "api/session",
      type: "POST",
      data: formData,
      success: function(data){
        callback(data);
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  requestLogout: function(data, callback){
    $.ajax({
      url: "api/session",
      type: "DELETE",
      data: data,
      success: function(response){
        callback(response);
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  requestSignup: function(userData, callback, sessionData){
    $.ajax({
      url: "/api/users",
      type: "POST",
      data: userData,
      success: function(response){
        callback(sessionData);
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  getUserInfo: function(id, callback){
    $.ajax({
      url: "/api/users/" + id,
      type: "GET",
      data: {id: id},
      success: function(response){
        callback(response);
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  }
};

module.exports = AuthServerApi;
