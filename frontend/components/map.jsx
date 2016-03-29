var React = require('react');
var ListingStore = require('../stores/listingStore');
var ListingActions = require('../actions/listingActions');
var ListStore = require('../stores/listStore');

var Map = React.createClass({
  getInitialState: function() {
    return {
      currentList: ListStore.returnCurrentList()
    };
  },
  componentDidMount: function(){
    this.listingListener = ListingStore.addListener(this._onListingStoreChange);
    this.listListener = ListStore.addListener(this._onCurrentListChange);
    var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]}];
    var mapDOMNode = this.refs.map;
    var mapOptions = {
      styles: styles,
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };

    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.listenForMove();
  },

  componentWillUnmount: function() {
    this.listingListener.remove();
    this.listListener.remove();
    this.mapListener.remove();
  },

  listenForMove: function(){
    var that = this;
    this.mapListener = google.maps.event.addListener(this.map, 'idle', function(){
      var LatLngBounds = this.getBounds();
      var bne = LatLngBounds.getNorthEast();
      var bsw = LatLngBounds.getSouthWest();
      var boundaries = {
            bounds: {
              northEast: {lat: bne.lat(), lng: bne.lng()},
              southWest: {lat: bsw.lat(), lng: bsw.lng()}
            }
          };
      if (that.state.currentList) {
        ListingActions.fetchListings(that.state.currentList.id, boundaries);
      }
    });
  },

  nullifyOutOfBounds: function(oldMarkers) {
    for (var i = 0; i < oldMarkers.length; i++) {
      oldMarkers[i].setMap(null);
    }
  },

  _onCurrentListChange: function() {
    this.setState({
      currentList: ListStore.returnCurrentList()
    });
    if (this.state.currentList) {
      ListingActions.fetchListingsNoBoundaries(this.state.currentList.id);
    }
  },

  _onListingStoreChange: function(){
    var listings = ListingStore.all();
    var listingObjects = listings.map(function(listing){
      return new google.maps.Marker({
        position: {lat: listing.lat, lng: listing.lng },
        map: this.map,
        title: listing.name,
        description: listing.description,
        id: listing.id

      });
    });

    this.markers = this.markers || listingObjects;
    var markerTitles = this.markers.map(function(marker){
      return marker.title;
    });

    var listingIds = listingObjects.map(function(listing){
      return listing.id;
    });

    var outOfBoundsMarkers = this.markers.filter(function(marker){
      return listingIds.indexOf(marker.id) < 0;
    });

    this.nullifyOutOfBounds(outOfBoundsMarkers);

    listingObjects.forEach(function(listingMarker){

      var infowindow = new google.maps.InfoWindow({
        content: "<span class='info-window'>" + listingMarker.title +
                  "<br />" + listingMarker.description + "</span>"
      });

      listingMarker.addListener('click', function() {
        infowindow.open(this.map, listingMarker);
      });

      this.markers.push(listingMarker);

      listingMarker.setMap(this.map);
    }.bind(this));
  },

  render: function(){
    return (
      <div className="map" ref="map">
      </div>
    );
  }
});

module.exports = Map;
