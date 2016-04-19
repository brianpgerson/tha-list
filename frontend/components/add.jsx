var React = require('react');
var ListStore = require('../stores/listStore');
var AddItem = require('./addItem');
var AddList = require('./addList');

var Add = React.createClass({
  getInitialState: function() {
    return {
      whatToAdd: null
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  _handleList: function() {
    this.context.router.push("add/newlist");
  },
  _handleItem: function() {
    this.context.router.push("add/newitem");
  },
  renderOptions: function() {
    var renderOps;
    if (this.state.whatToAdd === null)
    renderOps = (
      <div className="main-buttons-container group">
        <button onClick={this._handleList}
                className="main-button secondary-color">New List</button>
        <button onClick={this._handleItem}
                className="main-button secondary-color">New Item</button>
      </div>
    );
    else {
      renderOps = <div></div>;

    }
    return renderOps;
  },
  render: function(){
    var renderOps = this.renderOptions();
    return (
      <div>
        {renderOps}
        {this.props.children}
      </div>
    );
  }
});

module.exports = Add;
