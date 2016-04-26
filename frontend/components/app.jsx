var React = require('react');
var SessionStore = require('../stores/sessionStore');
var Flash = require('./flash');
var AuthActions = require('../actions/authActions');
var Login = require('./login');
var Footer = require('./footer');
var ListStore = require('../stores/listStore');
var ListActions = require('../actions/listActions');
var Modal = require('./modal');

window.ListStore = ListStore;

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
    var currentUser = SessionStore.returnCurrentUser();
    this.setState({
      loggedIn: SessionStore.isLoggedIn(),
      currentUser: currentUser
    });
    if (currentUser.userId) {
      ListActions.getUserLists(currentUser.userId);
    }
  },
  _handleUserLists: function(){
    this.setState({
      userLists: ListStore.all(),
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
  _upperCaseIt: function(string) {
    return string[0].toUpperCase() + string.slice(1);
  },
  _handleListChange: function(e){
    e.preventDefault();
    if (e.target.value === "add") {
      this.context.router.push("add/newlist");
    } else if (parseInt(e.target.value) > 0) {
      ListActions.setCurrentList(parseInt(e.target.value));
    }
  },
  returnButtons: function(){
    if (this.state.currentList) {
      return (
        <div className="button-row">
          <button className="main-button" onClick={this._handleMapClick}>Map</button>
          <button className="main-button" onClick={this._handleListClick}>List</button>
          <button className="main-button" onClick={this._handleAddClick}>Add</button>
        </div>
      );
    }
  },
  loginOrButtons: function() {
    if (this.state.loggedIn === true) {
      if (this.state.userLists.length === 0) {
        lists = <option value="add">Add New List</option>;
      } else {
        var lists = this.state.userLists.map(function(list){
          return <option key={list.id} value={list.id}>{this._upperCaseIt(list.name)}</option>;
        }.bind(this));
        lists.unshift(<option key="add" value="add">Add New List</option>);
      }
      var userLists = (
        <select className="list-selector"
                defaultValue="default"
                name="lists"
                onChange={this._handleListChange}>
          <option value="default">Select or Add a List</option>
          {lists}
        </select>
      );
      return (
        <div className="main-buttons-container group padded gray-background">
          {userLists}
          <br />
          {this.returnButtons()}
        </div>
      );
    } else if (this.state.loggedIn === false) {
      return <Login isLoggedIn = {false}/>;
    } else {
      return <div> </div>;
    }
  },
  render: function () {
    var loginOrButtons = this.loginOrButtons();
    return (
      <div className="wrapper">
        <Flash />
        {loginOrButtons}
        <Modal />
        {this.props.children}
        <Footer />
      </div>
    );
  }
});

module.exports = App;
