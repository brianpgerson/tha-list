var React = require('react');
var ListingStore = require('../stores/listingStore');
var ListingActions = require('../actions/listingActions');

var Map = React.createClass({
  componentDidMount: function(){
    ListingStore.addListener(this._onChange);
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

  listenForMove: function(){
    google.maps.event.addListener(this.map, 'idle', function(){
      var LatLngBounds = this.getBounds();
      var bne = LatLngBounds.getNorthEast();
      var bsw = LatLngBounds.getSouthWest();
      var boundaries = {
            bounds: {
              northEast: {lat: bne.lat(), lng: bne.lng()},
              southWest: {lat: bsw.lat(), lng: bsw.lng()}
            }
          };
      ListingActions.fetchListings(boundaries);
    });
  },

  nullifyOutOfBounds: function(oldMarkers) {
    for (var i = 0; i < oldMarkers.length; i++) {
      oldMarkers[i].setMap(null);
    }
  },

  _onChange: function(){
    var listings = ListingStore.all();
    var listingObjects = Object.keys(listings).map(function(id){
      return new google.maps.Marker({
        position: {lat: listings[id].lat, lng: listings[id].lng },
        map: this.map,
        title: listings[id].name,
        description: listings[id].description
      });
    });

    this.markers = this.markers || listingObjects;
    var markerTitles = this.markers.map(function(marker){
      return marker.title;
    });

    var listingTitles = listingObjects.map(function(listing){
      return listing.title;
    });

    var outOfBoundsMarkers = this.markers.filter(function(marker){
      return listingTitles.indexOf(marker.title) < 0;
    });

    this.nullifyOutOfBounds(outOfBoundsMarkers);

    listingObjects.forEach(function(listingMarker){

      var infowindow = new google.maps.InfoWindow({
        content: "<span class='info-window'>" + listingMarker.title + "<br />" + listingMarker.description + "</span>"
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
