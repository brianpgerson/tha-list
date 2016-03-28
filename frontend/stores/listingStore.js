var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var ListingStore = new Store(AppDispatcher);
var _listings = {};

function resetListing(listing) {
  _listings[listing.id] = listing;
}

function resetListings(listings) {
  _listings = {};
  listings.forEach(function(listing, i) {
    resetListing(listing);
  });
}

ListingStore.all = function () {
  return _listings;
};

ListingStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "LISTINGS_RECEIVED":
    resetListings(payload.listings);
    this.__emitChange();
    break;
  }
};


module.exports = ListingStore;
