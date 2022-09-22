"use strict";

jQuery(document).ready(function($) {
  let overlay = $(".body__overlay");

  $(overlay).hide();
  $(overlay).css("pointer-events", "none");
  
  $(overlay).click(function(event) {
    $(overlay).empty();
    $(overlay).hide();
    $(overlay).css("pointer-events", "none");
  });
});
