var React = require('react');
var ListStore = require('../stores/listStore');
var AddItem = require('./addItem');
var AddList = require('./addList');

var Add = React.createClass({
  getInitialState: function() {
    return {
      whatToAdd: null,
      currentList: ListStore.returnCurrentList(),
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount: function() {
    this.listStoreListener = ListStore.addListener(this._handleCurrentList);
  },
  componentWillUnmount: function() {
    this.listStoreListener.remove();
  },
  _handleCurrentList: function() {
    this.setState({
      currentList: ListStore.returnCurrentList()
    });
  },
  _handleList: function() {
    this.context.router.push("newlist");
  },
  _handleItem: function() {
    this.context.router.push("newitem");
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
