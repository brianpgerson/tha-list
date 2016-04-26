var React = require('react');
var ModalActions = require('../actions/modalActions');
var ListActions = require('../actions/listActions');
var ModalStore = require('../stores/modalStore');

var DeleteList = React.createClass({
  getInitialState: function() {
    return {
      listToDelete: ModalStore.returnData()
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  nevermind: function(){
    ModalActions.closeModal();
  },

  deleteIt: function(){
    ModalActions.closeModal();
    ListActions.deleteList(this.state.listToDelete);
    this.context.router.push("/");
  },

  render: function() {
    return (
      <div>
        <h3 className="modal-title black">Are You Sure?</h3>
        <div className="center black">If you are the owner, this list will be deleted. Otherwise, you will simply lose access to this list.</div>
        <div className="button-row">
          <button onClick={this.nevermind}
                className="main-button secondary-color">No</button>
          <button onClick={this.deleteIt}
                className="main-button secondary-color">Yes</button>
        </div>
      </div>
    );
  }
});

module.exports = DeleteList;
