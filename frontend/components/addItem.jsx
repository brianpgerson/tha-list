var React = require('react');
var ListingActions = require('../actions/listingActions');
var SessionStore = require('../stores/sessionStore');

var AddItem = React.createClass({
  getInitialState: function() {
    return {
      currentUser: SessionStore.returnCurrentUser(),
      currentList: this.props.list,
      name: "",
      description: "",
      lat: "",
      lng: ""
    };
  },
  handleInputChanges: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },
  handleSubmits: function(e){
  e.preventDefault();


  var listingParams =
    {
      listing: {
              list_id: this.state.currentList.id,
              name: this.state.name,
              description: this.state.description,
              lat: this.state.lat,
              lng: this.state.lng
          }
    };

    ListingActions.addListing(listingParams);
  },
  render: function(){
    return (
      <div className="listing-form">
        <form>
          <h1>add it to the list!</h1>
          <div>
            <label>Name of Activity/Place</label><br />
            <input type="text"
                    className="login-text-input"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChanges}/>
          </div>
          <div>
            <label>A Short Description</label><br />
            <input type="text"
                    className="login-text-input"
                    placeholder="Place with amazing pho..."
                    name="description"
                    value={this.state.password}
                    onChange={this.handleInputChanges}/>
          </div>
          <div>
            <label>Latitude</label><br />
            <input type="text"
                    className="login-text-input"
                    placeholder="this is for testing..."
                    name="lat"
                    value={this.state.password}
                    onChange={this.handleInputChanges}/>
          </div>
          <div>
            <label>Longitude</label><br />
            <input type="text"
                    className="login-text-input"
                    placeholder="this is for testing..."
                    name="lng"
                    value={this.state.password}
                    onChange={this.handleInputChanges}/>
          </div>
            <input type="submit"
                    className="main-button secondary-color"
                    value="add it!"
                    onClick={this.handleSubmits} />
        </form>
        <div className="errorHandler">
        </div>
      </div>
    );
  }
});

module.exports = AddItem;
