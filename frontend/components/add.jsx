var React = require('react');
var ListStore = require('../stores/listStore');


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
  _handleFriend: function() {
    this.context.router.push("add/newfriend");
  },
  renderOptions: function() {
    var renderOps;
    if (this.state.whatToAdd === null)
    renderOps = (
      <div className="main-buttons-container group">
        <button onClick={this._handleList}
                className="main-button secondary-color">List</button>
        <button onClick={this._handleItem}
                className="main-button secondary-color">Item</button>
        <button onClick={this._handleFriend}
                className="main-button secondary-color">Friend</button>
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
