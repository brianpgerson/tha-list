var React = require('react');
var ListStore = require('../stores/listStore')
var ListingActions = require('../actions/listingActions');
var ErrorHandler = require('./errorHandler');

var AddItem = React.createClass({
  getInitialState: function() {
    return {
      currentList: ListStore.returnCurrentList(),
      name: "",
      description: "",
      howBadWannaGo: "",
      city: "San Francisco"
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleInputChanges: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  handleSubmits: function(e){
  e.preventDefault();
  var errors = [];

  for (var prop in this.state) {
    if (this.state.hasOwnProperty && prop != "description") {
      if (prop === "currentList" && this.state[prop] === null) {
        errors.push("Please select a list from the dropdown first!");
      } else if (this.state[prop].length === 0) {
        errors.push("The field for " + prop + " can't be left blank, sorry!");
      }
    }
  }

  if (errors.length > 0) {
    ErrorActions.sendError(errors)
  } else {

    var listingParams =
      {
        listing: {
                list_id: this.state.currentList.id,
                name: this.state.name,
                description: this.state.description,
                city: this.state.city,
                how_bad_wanna_go: this.state.howBadWannaGo
            }
      };

    ListingActions.addListing(listingParams);
    this.context.router.push("list")
  }

  },
  render: function(){
    return (
      <div className="listing-form">
        <form>
          <h1>add it to the list!</h1>
          <div>
            <label htmlFor="name">Name of Activity/Place</label><br />
            <input type="text"
                    className="login-text-input"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChanges}/>
          </div>
          <div>
            <label htmlFor="description">A Short Description</label><br />
            <input type="text"
                    className="login-text-input"
                    placeholder="Place with amazing pho..."
                    name="description"
                    value={this.state.description}
                    onChange={this.handleInputChanges}/>
          </div>
          <div>
            <label htmlFor="city">City (Important for Search!)</label><br />
            <input type="text"
                    className="login-text-input"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleInputChanges}/>
          </div>
          <div>
            <label htmlFor="howBadWannaGo">How Bad Do You Wanna Go? (Coolness Rating, 1-10)</label><br />
            <input type="integer"
                    className="login-text-input"
                    name="howBadWannaGo"
                    value={this.state.howBadWannaGo}
                    onChange={this.handleInputChanges}/>
          </div>
            <input type="submit"
                    className="main-button secondary-color"
                    value="add it!"
                    onClick={this.handleSubmits} />
        </form>
        <div className="errorHandler">
          <ErrorHandler />
        </div>
      </div>
    );
  }
});

module.exports = AddItem;
