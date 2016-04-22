var ErrorActions = require('../actions/errorActions');

var ListingServerApi = {
  addListing: function(listingParams, callback){
    $.ajax({
    url: "api/listings",
    type: "POST",
    data: listingParams,
    success: function(data){
        callback(data);
      },
    error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },

  fetchListings: function(listId, boundaries, callback){
    $.ajax({
    url: "api/lists/" + listId + "/listings",
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
  },

  fetchListingsNoBoundaries: function(listId, callback){
    $.ajax({
    url: "api/lists/" + listId + "/listings",
    type: "GET",
    data: {bounds: null},
    success: function(data){
        callback(data);
      },
    error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },

  deleteListing: function(listingId, callback){
    $.ajax({
    url: "api/listings/" + listingId,
    type: "DELETE",
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
