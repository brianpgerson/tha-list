var React = require('react');
var SessionStore = require('../stores/sessionStore');
var AuthActions = require('../actions/authActions');
var Login = require('./login');
var Map = require('./map');

var App = React.createClass({
  getInitialState: function(){
    return ({
      loggedIn: null,
      currentUser: null
    });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount: function() {
    this.loginListener = SessionStore.addListener(this._handleLogin);
    AuthActions.checkLogin();
  },
  componentWillUnmount: function() {
    this.loginListener.remove();
  },
  _handleLogin: function(){
    this.setState({
      loggedIn: SessionStore.isLoggedIn(),
      currentUser: SessionStore.returnCurrentUser()
    });
  },
  returnLoginModule: function() {
    if (this.state.loggedIn) {
      return <div><Map/></div>;
    } else {
      return <Login isLoggedIn = {false}/>;
    }
  },
  render: function () {
    var loginMod = this.returnLoginModule();
    return (
      <div className="wrapper">
        <header></header>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
