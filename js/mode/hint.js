var HintMode = function() {
  this.newTab = false;
};

HintMode.prototype.onKeyDown = function(stack, currentKey, e) {
  e.stop();
  var hint = Viewport.getCurrentHintElement();
  var elements = hint.getMatchedElements(stack);

  if (elements.length == 0) {
    Command.cancelHintMode();
    return true;
  }
  else if (elements.length == 1 && elements[0].getKey() == stack) {
    Command.cancelHintMode();
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, this.newTab, 0, null);
    elements[0].getElement().get(0).dispatchEvent(e);
    elements[0].getElement().focus();
    return true;
  }
  else {
    hint.hideUnmatchedElements(stack);
    for (var i in elements) {
      elements[i].setPushed();
    }
    return false;
  }
};

HintMode.prototype.setOpenNewTab = function(newTab) {
  this.newTab = newTab;
};