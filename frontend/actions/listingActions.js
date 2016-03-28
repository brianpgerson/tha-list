var AppDispatcher = require('../dispatcher/dispatcher');
var ListingServerApi = require('../util/listingServerUtil');

var ListingActions = {
  receiveListings: function(listings){
    AppDispatcher.dispatch({
      actionType: "LISTINGS_RECEIVED",
      listings: listings
    });
  },

  fetchListings: function(boundaries){
    ListingServerApi.fetchListings(boundaries, ListingActions.receiveListings);
  }

};

module.exports = ListingActions;
