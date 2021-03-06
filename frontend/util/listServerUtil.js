var ErrorActions = require('../actions/errorActions');
var ModalActions = require('../actions/modalActions');
var FlashActions = require('../actions/flashActions');

var ListServerApi = {
  addList: function(listParams, callback) {
    $.ajax({
      url: "api/lists",
      type: "POST",
      data: listParams,
      success: function(data){
          callback(data);
        },
      error: function(response){
          var error = JSON.parse(response.responseText).errors;
          ErrorActions.sendError(error);
        }
    });
  },

  addUserList: function(userListParams) {
    $.ajax({
      url: "api/userlists",
      type: "POST",
      data: userListParams,
      success: function(data) {
        FlashActions.sendMessage(["User Added!"]);
      },
      error: function(response){
          var error = JSON.parse(response.responseText).errors;
          ErrorActions.sendError(error);
        }
    });
  },

  fetchLists: function(userId, callback){
    $.ajax({
    url: "api/lists",
    type: "GET",
    data: userId,
    success: function(data){
        callback(data);
      },
    error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },

  deleteList: function(listId, callback){
    $.ajax({
      url: "api/lists/" + listId,
      type: "DELETE",
      success: function(data){
        callback(data.user_id);
        FlashActions.sendMessage(["List Removed!"]);
      },
      error: function(response){
          var error = JSON.parse(response.responseText).errors;
          ErrorActions.sendError(error);
        }
    });
  },

  setCurrentList: function(listId, callback){
    $.ajax({
    url: "api/lists/" + listId,
    type: "GET",
    success: function(data){
        callback(data);
      },
    error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
};

module.exports = ListServerApi;
