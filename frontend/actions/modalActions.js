var AppDispatcher = require('../dispatcher/dispatcher');
var ErrorActions = require('../actions/errorActions');

var ModalActions = {
  openModal: function(type, data){
    AppDispatcher.dispatch({
      actionType: "DISPLAY_MODAL",
      type: type,
      data: data
    });
  },

  closeModal: function(){
    ErrorActions.resetErrors();
    AppDispatcher.dispatch({
      actionType: "CLOSE_MODAL",
    });
  }
};

module.exports = ModalActions;
