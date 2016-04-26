var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _display;
var _type;
var _data;

var ModalStore = new Store(AppDispatcher);

function setModal(display, type, data){
  _display = display;
  _type = type;
  _data = data;
}

ModalStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "DISPLAY_MODAL":
    setModal(true, payload.type, payload.data);
    this.__emitChange();
    break;
  case "CLOSE_MODAL":
    setModal(false);
    this.__emitChange();
  }
};

ModalStore.returnDisplay = function(){
  return _display;
};

ModalStore.returnType = function(){
  return _type;
};

ModalStore.returnData = function(){
  return _data;
};

module.exports = ModalStore;
