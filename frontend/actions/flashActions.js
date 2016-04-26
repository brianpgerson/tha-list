var AppDispatcher = require('../dispatcher/dispatcher');

var FlashActions = {
  sendMessage: function(messages){
    AppDispatcher.dispatch({
      actionType: "DISPLAY_MESSAGES",
      messages: messages
    });
  },
  resetMessages: function(){
    AppDispatcher.dispatch({
      actionType: "RESET_MESSAGES",
    });
  }
};

module.exports = FlashActions;
