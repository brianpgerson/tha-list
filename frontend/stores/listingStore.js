var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var ListingStore = new Store(AppDispatcher);
var _listings = [];

function resetListings(listings) {
  _listings = listings;
}

ListingStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "LISTINGS_RECEIVED":
    resetListings(payload.listings);
    this.__emitChange();
    break;
  }
};

ListingStore.all = function () {
  return _listings;
};

module.exports = ListingStore;
