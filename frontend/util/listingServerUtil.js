var ErrorActions = require('../actions/errorActions');

var ListingServerApi = {
  fetchListings: function(boundaries, callback){
    $.ajax({
    url: "api/listings",
    type: "GET",
    data: boundaries,
    success: function(data){
        callback(data);
      },
    error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  }
};

module.exports = ListingServerApi;
