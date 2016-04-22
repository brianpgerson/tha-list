var React = require('react');
var ListingActions = require('../actions/listingActions');

var ListItem = React.createClass({

  removeListing: function(id){
    ListingActions.deleteListing(id);
  },

  returnListItem: function(){
    var listing = this.props.listing;
    var that = this;
    var yelpURL = "http://www.yelp.com/biz/" + listing.yelp_biz_id;
    var ratingStyle = {
      backgroundImage: "url(" + listing.rating_img_url + ")",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat"
    };
    var formattedListing = (
      <div>
        <h3 className="listing-title">{listing.name}</h3>
        <div className="remove-listing" onClick={ function(){
            that.removeListing(listing.id);
          }
        }>X</div>

        <div className="list-line"><span>Coolness Rating: </span>{listing.how_bad_wanna_go}</div>

        <hr className="between-list-lines"></hr>

        <div className="list-line">
          <div>Yelp Info: </div>
          <div className="yelp-line">
            <div className="rating"><div className="rating-img" style={ratingStyle}></div><div className="rating-num">({listing.num_ratings})</div></div>
            <a href={yelpURL} target="_blank"><div className="yelp-reviews"></div></a>
          </div>
        </div>

        <hr className="between-list-lines"></hr>

        <div className="list-line"><span>Description: </span><span className="listing-descrip">{listing.description}</span></div>
      </div>
    );
    return formattedListing;
  },
  render: function(){
    var formattedListing = this.returnListItem();
    return (
      <li className="listing-li">
        {formattedListing}
      </li>
    );
  }
});

module.exports = ListItem;
