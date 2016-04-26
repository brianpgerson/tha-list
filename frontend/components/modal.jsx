var React = require('react');
var Modal = require('boron/OutlineModal');
var ModalStore = require('../stores/modalStore');
var DeleteList = require('./deleteList');

var MyModal = React.createClass({
  getInitialState: function() {
    return {
      display: false,
      type: null,
      data: null
    };
  },
  componentWillMount: function() {
    this.modalStoreListener = ModalStore.addListener(this._handleModalChanges);
  },
  _handleModalChanges: function() {
    this.setState({
      type: ModalStore.returnType()
    });
    if (ModalStore.returnDisplay()) {
      this.refs.modal.show();
    } else {
      this.refs.modal.hide();
    }
  },

  whatToDisplay: function(){
    switch(ModalStore.returnType()) {
      case "deleteList":
        var theModal =
          <div className="modal-wrapper">
            <DeleteList />
          </div>;
        break;
      }
    return theModal;
  },
  returnModalStyles: function(){
    return {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      borderRadius: '5px'
    };
  },
  render: function(){

    var type = ModalStore.returnType();
    var theModal = this.whatToDisplay();
    var modalSizing = {};
    if (type === "deleteList") {
      modalSizing.width = '350px';
      modalSizing.height = '180px';
    }

    var contentStyle = this.returnModalStyles();

     return (
      <div>
        <Modal contentStyle={contentStyle} modalStyle={modalSizing} ref="modal">
          {theModal}
        </Modal>
      </div>
    );
  }
});

module.exports = MyModal;
