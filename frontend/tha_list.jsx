var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var App = require('./components/app');
var Login = require('./components/login');
var Map = require('./components/map');

var routes = (
  <Route component={App} path="/">
    <IndexRoute component={Login}></IndexRoute>
    <Route component={Map} path="map"></Route>
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
