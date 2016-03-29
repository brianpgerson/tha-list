var React = require('react');

var ListItem = React.createClass({
  returnListItem: function(){
    var listing = this.props.listing;
    var formattedListing = (
      <div>
        <h3 className="listing-title">{listing.name}</h3>
        <p className="listing-text">{listing.description}</p>
      </div>
    );
    return formattedListing;
  },
  render: function(){
    var formattedListing = this.returnListItem();
    return (
      <li>
        {formattedListing}
      </li>
    );
  }
});

module.exports = ListItem;
