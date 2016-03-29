var ErrorActions = require('../actions/errorActions');

var ListServerApi = {
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