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
  <Route path="/" component={App}>
    <Route path="map" component={Map} />
    <Route path="list" component={List} />
    <Route path="add" component={Add}>
      <Route path="newitem" component={AddItem} />
      <Route path="newlist" component={AddList} />
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
