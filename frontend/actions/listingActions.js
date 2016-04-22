var AppDispatcher = require('../dispatcher/dispatcher');
var ListingServerApi = require('../util/listingServerUtil');

var ListingActions = {

  // ======INBOUND
  receiveListings: function(listings) {
    AppDispatcher.dispatch({
      actionType: "LISTINGS_RECEIVED",
      listings: listings
    });
  },

  removeListing: function(listing) {
    AppDispatcher.dispatch({
      actionType: "LISTING_DELETED",
      listing: listing
    });
  },

  // ======OUTBOUND

  deleteListing: function(listingId) {
    ListingServerApi.deleteListing(listingId, ListingActions.removeListing);
  },

  addListing: function(listingParams) {
    ListingServerApi.addListing(listingParams, ListingActions.receiveListings);
  },

  fetchListings: function(listId, boundaries) {
    ListingServerApi.fetchListings(listId, boundaries, ListingActions.receiveListings);
  },

  fetchListingsNoBoundaries: function(listId) {
    ListingServerApi.fetchListingsNoBoundaries(listId, ListingActions.receiveListings);
  },

};

module.exports = ListingActions;
