var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _messages = [];

var FlashStore = new Store(AppDispatcher);

function setFlash(messages){
  _messages = messages;
}

FlashStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "DISPLAY_MESSAGES":
    setFlash(payload.messages);
    this.__emitChange();
    break;
  case "RESET_MESSAGES":
    setFlash([]);
    this.__emitChange();
  }
};

FlashStore.all = function(){
  return _messages.slice();
};

module.exports = FlashStore;
