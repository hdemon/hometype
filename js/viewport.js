var _Viewport = function() {
};

_Viewport.prototype.getScrollPosition = function() {
  return {
    top: document.body.scrollTop,
    left: document.body.scrollLeft
  }
};

_Viewport.prototype.getWindowWidth = function() {
  return window.innerWidth;
};

_Viewport.prototype.getWindowHeight = function() {
  return window.innerHeight;
};

_Viewport.prototype.getDocumentWidth = function() {
  return $(document).width();
};

_Viewport.prototype.getDocumentHeight = function() {
  return $(document).height();
};

_Viewport.prototype.scrollTo = function(x, y) {
  document.body.scrollTop = y;
  document.body.scrollLeft = x;
};

_Viewport.prototype.scrollDown = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left, pos.top + value);
};

_Viewport.prototype.scrollUp = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left, pos.top - value);
};

_Viewport.prototype.scrollLeft = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left - value, pos.top);
};

_Viewport.prototype.scrollRight = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left + value, pos.top);
};

_Viewport.prototype.clickableElementInnerScreen = function() {
  var _this = this;
  var elements = [];
  $('*').each(function() {
    var element = $(this);

    var tagName = element.get(0).tagName.toLowerCase();
    var submittable = tagName == 'input' && (element.is(':submit') || element.is(':reset') || element.is(':image'));
    var clickable = tagName == 'a' || tagName == 'area' || element.css('cursor') == 'pointer';
    if ((clickable || submittable) && _this.isInnerScreen(element)) {
      elements.push(element);
    }
  });

  return elements;
};

_Viewport.prototype.formElementInnerScreen = function() {
  var _this = this;
  var elements = [];
  $('textarea, :file, :text, :password, :radio, select').each(function() {
    var element = $(this);
    if (_this.isInnerScreen(element)) {
      elements.push(element);
    }
  });

  return elements;
};

_Viewport.prototype.createNewHintElement = function(hintTheme, target) {
  target = target || Viewport.clickableElementInnerScreen();

  var currentHint = this.getCurrentHintElement();
  if (currentHint) {
    currentHint.removeAllHint();
  }

  this.hintElement = new HintElementCollection(hintTheme, target);
  return this.hintElement;
};

_Viewport.prototype.getCurrentHintElement = function() {
  return this.hintElement;
};

_Viewport.prototype.isInnerScreen = function(element) {
  if (element.get(0).tagName.toLowerCase() == 'area') {
    element = element.parent().parent();
  }

  var screenOffsetTop     = this.getScrollPosition().top;
  var screenOffsetBottom  = screenOffsetTop + this.getWindowHeight();
  var elementOffsetTop    = element.offset().top;
  var elementOffsetBottom = elementOffsetTop + element.height();

  return element.is(':visible') && elementOffsetBottom >= screenOffsetTop && screenOffsetBottom >= elementOffsetTop;
};

_Viewport.prototype.setContentEditable = function(editable) {
  return $('html').attr('contenteditable', editable);
};

_Viewport.prototype.createLink = function(url, parent) {
  var parent = $(parent || 'body');
  return $('<a>').attr('href', url).appendTo(parent);
};

_Viewport.prototype.getNextTextableFrom = function(el) {
  var nestedCount = 0;
  while (el.length != 0 && nestedCount++ < 100) {
    var next = el.next();

    while (next.length > 0 && next.text() == '') {
      next = next.next();
    }

    if (next.length > 0) {
      el = next.get(0);
      break;
    }
    else {
      el = el.parent();
    }
  }

  return el;
};

var Viewport = new _Viewport();