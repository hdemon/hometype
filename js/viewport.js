/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Screen object.
 */
var ChromekeyScreen = function() {
};

/**
 * Get the current scroll position.
 *
 * @return Object A hash that has top and left key.
 */
ChromekeyScreen.prototype.getScrollPosition = function() {
  return {
    top: document.body.scrollTop,
    left: document.body.scrollLeft
  };
};

/**
 * Get the current window size.
 *
 * @return Object A hash that has width and height key.
 */
ChromekeyScreen.prototype.getWindowSize = function() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

/**
 * Get the current document size.
 *
 * @return Object A hash that has width and height key.
 */
ChromekeyScreen.prototype.getDocumentSize = function() {
  return {
    width: $(document).width(),
    height: $(document).height()
  };
};

/**
 * Scroll to specified position.
 *
 * @param integer x horizontal position.
 * @param integer y vertical position.
 */
ChromekeyScreen.prototype.scrollTo = function(x, y) {
  document.body.scrollTop = y;
  document.body.scrollLeft = x;
};

/**
 * Scroll to specified position for vertical direction.
 *
 * @param integer value Scroll amount.
 */
ChromekeyScreen.prototype.scrollVertical = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left, pos.top + value);
};

/**
 * Scroll to specified position for horizontal direction.
 *
 * @param integer value Scroll amount.
 */
ChromekeyScreen.prototype.scrollHorizontal = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left - value, pos.top);
};

ChromekeyScreen.prototype.setContentEditable = function(element) {
  element.attr('contenteditable', true);
  element.attr('data-chromekey-not-insert-mode', 'true');
  element.attr('data-chromekey-contenteditable', 'true');
  $('<div>').addClass('chromekey-contenteditable').css({
    width: element.innerWidth() + 10,
    height: element.innerHeight() + 10,
    top: element.offset().top - 5,
    left: element.offset().left - 5
  }).appendTo($('body')).click(function() {
    element.focus();
  });
};

ChromekeyScreen.prototype.resetContentEditable = function() {
  var element = this.getCurrentContentEditable();
  element.removeAttr('contenteditable');
  element.removeAttr('data-chromekey-not-insert-mode');
  element.removeAttr('data-chromekey-contenteditable');
  $('.chromekey-contenteditable').remove();
  $(document.activeElement).blur();
};

ChromekeyScreen.prototype.getCurrentContentEditable = function() {
  return $('[data-chromekey-contenteditable=true]');
};

ChromekeyScreen.prototype.getNextContentEditableElement = function(current) {
  var next = null;

  while (current.length > 0) {
    next = current.next();
    if (next.length > 0) {
      if (next.is(':visualable:visible')) {
        break;
      }
      else {
        current = next;
      }
    }
    else {
      current = current.parent();
    }
  }

  return next;
};

ChromekeyScreen.prototype.getPrevContentEditableElement = function(current) {
  var prev = null;

  while (current.length > 0) {
    prev = current.prev();
    if (prev.length > 0) {
      if (prev.is(':visualable:visible')) {
        break;
      }
      else {
        current = prev;
      }
    }
    else {
      current = current.parent();
    }
  }

  return prev;
};

/**
 * Add link element to DOM.
 *
 * @param string  url    link url.
 * @param element parant An element that is parent for a link element.
 *                       Add link element into body element if omit an argument.
 */
ChromekeyScreen.prototype.createLink = function(url, parent) {
  var parent = $(parent || 'body');
  return $('<a>').attr('href', url).appendTo(parent);
};

var Viewport = new ChromekeyScreen();
