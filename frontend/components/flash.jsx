var React = require('react');
var FlashStore = require('../stores/flashStore');
var FlashActions = require('../actions/flashActions');

var Flash = React.createClass({
  getInitialState: function(){
    return ({
      messages: []
    });
  },
  componentDidMount: function(){
    this.flashListener = FlashStore.addListener(this._onChange);
    this.setState({
      errors: this.props.prebakedFlash ? this.props.prebakedFlash : []
    });
  },
  _onChange: function(){
    var messages = FlashStore.all();
    this.setState({messages: messages});
  },
  componentWillUnmount: function(){
    this.flashListener.remove();
  },

  _resetMessages: function(){
    FlashActions.resetMessages();
  },

  render: function(){
    var messages = this.state.messages.map(function(msg, idx){
      return (<li className="message" key={idx}>{msg}</li>);
    });

    if (this.state.messages.length > 0) {
      var flashList = (
        <ul id="flash">
          <div className="remove-listing" onClick={this._resetMessages}>X</div>
          {messages}
        </ul>
      );
    } else {
      flashList = <div></div>;
    }
    return (
      <div>
        {flashList}
      </div>
    );
  }
});

module.exports = Flash;
