var React = require('react');
var SessionStore = require('../stores/sessionStore');
var AuthActions = require('../actions/authActions');
var Login = require('./login');
var Map = require('./map');
var ListStore = require('../stores/listStore');
var ListActions = require('../actions/listActions');

var App = React.createClass({
  getInitialState: function(){
    return ({
      loggedIn: null,
      currentUser: null,
      userLists: [],
      currentList: null
    });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount: function() {
    this.loginListener = SessionStore.addListener(this._handleLogin);
    this.listListener = ListStore.addListener(this._handleUserLists);
    AuthActions.checkLogin();
  },
  componentWillUnmount: function() {
    this.loginListener.remove();
    this.listListener.remove();
  },
  _handleLogin: function(){
    this.setState({
      loggedIn: SessionStore.isLoggedIn(),
      currentUser: SessionStore.returnCurrentUser()
    });
    if (this.state.loggedIn) {
      ListActions.getUserLists(this.state.currentUser.id);
    }
  },
  _handleUserLists: function(){
    var lists = ListStore.all();
    this.setState({
      userLists: lists,
      currentList: ListStore.returnCurrentList()
    });
  },
  _handleMapClick: function(e){
    e.preventDefault();
    this.context.router.push("map");
  },
  _handleListClick: function(e){
    e.preventDefault();
    this.context.router.push("list");
  },
  _handleAddClick: function(e){
    e.preventDefault();
    this.context.router.push("add");
  },
  returnUsersLists: function() {
    if (this.state.loggedIn) {
      var lists = ListStore.all();
      return lists;
    }
    return [];
  },
  _upperCaseIt: function(string) {
    return string[0].toUpperCase() + string.slice(1);
  },
  _handleListChange: function(e){
    e.preventDefault();
    if (parseInt(e.target.value) > 0) {
      ListActions.setCurrentList(parseInt(e.target.value));
    }
  },
  returnButtons: function(){
    if (this.state.currentList) {
      return (
        <div>
          <button className="main-button" onClick={this._handleMapClick}>Map</button>
          <button className="main-button" onClick={this._handleListClick}>List</button>
          <button className="main-button" onClick={this._handleAddClick}>Add</button>
        </div>
      );
    } else {
      return <h2>Please Select a List</h2>;
    }
  },
  loginOrButtons: function() {
    if (this.state.loggedIn === true) {
      var allUsersLists = this.returnUsersLists();
      if (allUsersLists[0] === undefined) {
        var userLists = <h2>Add a New List!</h2>;
      } else {
        var lists = allUsersLists.map(function(list){
          return <option key={list.id} value={list.id}>{this._upperCaseIt(list.name)}</option>;
          }.bind(this));
        userLists = (
          <select className="list-selector"
                  defaultValue="default"
                  name="lists"
                  onChange={this._handleListChange}>
            <option value="default">Select a List</option>
            {lists}
          </select>
        );
      }
      return (
        <div className="main-buttons-container group">
          {userLists}
          <br />
          {this.returnButtons()}
        </div>
      );
    } else if (this.state.loggedIn === false) {
      return <Login isLoggedIn = {false}/>;
      // var childrenWithProps = React.Children.map(this.props.children, function(child) {
      //   return React.cloneElement(child, {doSomething : this.doSomething})
      // });
    } else {
      return <div> </div>;
    }
  },
  render: function () {
    var loginOrButtons = this.loginOrButtons();
    return (
      <div className="wrapper">
        <header></header>
        {loginOrButtons}
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
