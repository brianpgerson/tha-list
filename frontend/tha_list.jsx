var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var App = require('./components/app');
var List = require('./components/list');
var Map = require('./components/map');
var Add = require('./components/add');
var SessionStore = require('./stores/sessionStore');
var AddList = require('./components/addList');
var AddFriend = require('./components/addFriend');
var AddItem = require('./components/addItem');
var About = require('./components/about');

var routes = (
  <Route path="/" component={App}>
    <Route path="map" component={Map} onEnter={checkLogin} />
    <Route path="list" component={List} onEnter={checkLogin} />
    <Route path="add" component={Add}>
      <Route path="newitem" component={AddItem} onEnter={checkLogin} />
      <Route path="newlist" component={AddList} onEnter={checkLogin} />
      <Route path="newfriend" component={AddFriend} onEnter={checkLogin} />
    </Route>
    <Route path="about" component={About} />
  </Route>
);

function checkLogin(nextState, replace){
  if (!SessionStore.isLoggedIn()) {
   replace({
     pathname: '/',
     state: { nextPathname: nextState.location.pathname }
   });
 }
}

document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('#root');
  ReactDOM.render(
    <Router history={hashHistory}>
      {routes}
    </Router>,
    root
  );
});
