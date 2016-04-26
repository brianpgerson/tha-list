var React = require('react');
var SessionStore = require('../stores/sessionStore');
var ListingStore = require('../stores/listingStore');
var AuthActions = require('../actions/authActions');
var ListingActions = require('../actions/listingActions');
var ModalActions = require('../actions/modalActions');
var ListItem = require('./listItem');
var ListStore = require('../stores/listStore');
var ListingStore = require('../stores/listingStore');


var List = React.createClass({
  getInitialState: function() {
    return {
      currentUser: SessionStore.returnCurrentUser(),
      currentList: ListStore.returnCurrentList(),
      listings: []
    };
  },
  componentWillMount: function() {
    this.listListener = ListStore.addListener(this._handleCurrentList);
    this.listingListener = ListingStore.addListener(this._handleListings);
    if (this.state.currentList){
      ListingActions.fetchListingsNoBoundaries(this.state.currentList.id);
    }
  },
  componentWillUnmount: function() {
    this.listListener.remove();
    this.listingListener.remove();
  },
  _handleCurrentList: function() {
    this.setState({
      currentList: ListStore.returnCurrentList()
    });
    if (this.state.currentList){
      ListingActions.fetchListingsNoBoundaries(this.state.currentList.id);
    }
  },
  _handleListings: function(){
    this.setState({
      listings: ListingStore.all()
    });
  },

  maybeRemoveThisList: function(){
    ModalActions.openModal("deleteList", this.state.currentList.id);
  },

  returnListings: function(){
    var listings = this.state.listings.map(function(listing){
      return <ListItem key={listing.id} listing={listing}/>;
    });
    return listings;
  },
  render: function(){
    var listings = this.returnListings()[0] !== undefined ?
      this.returnListings() : <li id="empty_list">This list is empty!</li>;
    return (
      <div>
        <ul className="list-ul">
          {listings}
        </ul>
        <div className="text-link center" onClick={this.maybeRemoveThisList}>Remove this list</div>

      </div>
    );
  }
});

module.exports = List;
