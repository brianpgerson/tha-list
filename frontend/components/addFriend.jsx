var React = require('react');
var SessionStore = require('../stores/sessionStore');
var UserStore = require('../stores/userStore');
var ErrorHandler = require('./errorHandler');
var ListStore = require('../stores/listStore');
var ListActions = require('../actions/listActions');
var UserActions = require('../actions/userActions');
var AuthActions = require('../actions/authActions');

var AddFriend = React.createClass({
  getInitialState: function() {
    return {
      friendSearchTerm: "",
      searchResults: null,
      selectedFriend: null,
      currentList: ListStore.returnCurrentList(),
      added: false
    };
  },

  componentWillMount: function() {
    this.searchListener = UserStore.addListener(this._handleSearchResults);
    this.listListener = ListStore.addListener(this._handleCurrentList);
  },

  componentWillUnmount: function() {
    this.searchListener.remove();
    this.listListener.remove();
  },

  _handleCurrentList: function(){
    this.setState({
      currentList: ListStore.returnCurrentList()
    });
  },

  _handleSearchResults: function(){
    this.setState({
      searchResults: UserStore.all()
    });
  },

  handleInputChanges: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  handleSubmits: function(e){
    e.preventDefault();
    if (this.state.selectedFriend === null ||
        this.state.currentList === undefined) {
      ErrorHandler.sendError(['Please choose a friend and a list!']);
    } else {

      var userListParams = {
          userList: {
                  userId: this.state.selectedFriend,
                  listId: this.state.currentList.id
              }
        };
      ListActions.addUserList(userListParams);
    }
    
  },

  _handleListChange: function(e){
    e.preventDefault();
    this.setState({
      selectedFriend: e.target.value
    });
  },

  returnSearchResults: function(e) {
    e.preventDefault();
    UserActions.searchForUser(this.state.friendSearchTerm);
  },

  render: function(){

    var searchResults;
    if (this.state.searchResults === null) {
      searchResults = <div></div>
    } else if (this.state.searchResults.length > 0) {
      var friends = this.state.searchResults.map(function(user){
        return <option key={user.id} value={user.id}>{user.username}</option>;
      });
      searchResults = (
        <div>
          <select className="friend-selector"
                  defaultValue="default"
                  name="lists"
                  onChange={this._handleListChange}>
            <option value="default">Select a Friend</option>
            {friends}
          </select>
        </div>
      );
    } else {
      searchResults = <div style={{marginBottom: "20px"}}>No usernames matched that search!</div>;
    }

    return (
      <div className="list-form">
        <form>
          <h1>add a new friend!</h1>
          <div>
            <label htmlFor="friendSearchTerm">Search For Friends</label><br />
            <input type="text"
                    className="login-text-input"
                    name="friendSearchTerm"
                    placeholder="search by username"
                    value={this.state.friendSearchTerm}
                    onChange={this.handleInputChanges}/>
          </div>
          {searchResults}
          <div>
            <input type="submit"
                    className="main-button secondary-color"
                    value={this.state.selectedFriend ? "Add Friend!" : "Search!"}
                    onClick={this.state.selectedFriend ? this.handleSubmits : this.returnSearchResults} />
          </div>
        </form>
        <div className="errorHandler">
          <ErrorHandler />
        </div>
      </div>
    );
  }
});

module.exports = AddFriend;
