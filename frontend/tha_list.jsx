var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var App = require('./components/app');
var List = require('./components/list');
var Login = require('./components/login');
var Map = require('./components/map');
var Add = require('./components/add');
var AddList = require('./components/addList');
var AddItem = require('./components/addItem');

var routes = (
  <Route component={App} path="/">
    <Route component={Map} path="map"></Route>
    <Route component={List} path="list"></Route>
    <Route component={Add} path="add">
      <Route component={AddItem} path="newitem" />
      <Route component={AddList} path="newlist" />
    </Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('#root');
  ReactDOM.render(
    <Router history={hashHistory}>
      {routes}
    </Router>,
    root
  );
});
