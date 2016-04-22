var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var ListingStore = new Store(AppDispatcher);
var _listings = [];

function resetListings(listings) {
  _listings = listings;
}

function removeListing(listing) {
 _listings = _listings.filter(function(li){
   return li.id !== listing.id;
 });
}

ListingStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "LISTINGS_RECEIVED":
      resetListings(payload.listings);
      this.__emitChange();
      break;
    case "LISTING_DELETED":
      removeListing(payload.listing);
      this.__emitChange();
      break;
  }
};

ListingStore.all = function () {
  return _listings;
};

module.exports = ListingStore;
