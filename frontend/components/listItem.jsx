var React = require('react');

var ListItem = React.createClass({
  returnListItem: function(){
    var listing = this.props.listing;
    var yelpURL = "http://www.yelp.com/biz/" + listing.yelp_biz_id;
    var ratingStyle = {
      backgroundImage: "url(" + listing.rating_img_url + ")",
      backgroundSize: "contain",
      height: "20px",
      width: "100px",
      backgroundRepeat: "no-repeat"
    };
    var formattedListing = (
      <div>
        <h3 className="listing-title">{listing.name}</h3>

        <div className="list-line"><span>Coolness Rating: </span>{listing.how_bad_wanna_go}</div>

        <hr className="between-list-lines"></hr>

        <div className="list-line">
          <div>Yelp Info: </div>
          <div className="yelp-line">
            <div className="rating"><div style={ratingStyle}></div><div className="rating-num">({listing.num_ratings})</div></div>
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
