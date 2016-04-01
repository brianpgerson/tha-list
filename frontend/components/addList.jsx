var React = require('react');
var SessionStore = require('../stores/sessionStore');
var ErrorHandler = require('./errorHandler');
var ListActions = require('../actions/listActions');
var AuthActions = require('../actions/authActions');

var AddList = React.createClass({
  getInitialState: function() {
    return {
      name: ""
    };
  },
  handleInputChanges: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  handleSubmits: function(e){
  e.preventDefault();
  if (this.state.name.length === 0) {
    ErrorHandler.sendError(['Please give this poor list a name!']);
  } else {

    var listParams =
      {
        list: {
                name: this.state.name
            }
      };

    ListActions.addList(listParams);
  }

  },
  render: function(){
    return (
      <div className="list-form">
        <form>
          <h1>add a new list!</h1>
          <div>
            <label htmlFor="name">New List Name</label><br />
            <input type="text"
                    className="login-text-input"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChanges}/>
          </div>
          <div>
            <input type="submit"
                    className="main-button secondary-color"
                    value="add it!"
                    onClick={this.handleSubmits} />
          </div>
        </form>
        <div className="errorHandler">
          <ErrorHandler />
        </div>
      </div>
    );
  }
});

module.exports = AddList;
