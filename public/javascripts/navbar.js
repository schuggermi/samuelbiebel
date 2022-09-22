"use strict";

jQuery(document).ready(function($) {
  const togglerBars = $(".navbar__toggler");
  const navlist = $(".navbar__list");
  const logo = $(".logo");
  const telegram = $(".fa-telegram");

  toggleNavbarToggler();
  checkSiteChange();

  $(window).resize(function(event) {
    toggleNavbarToggler();
  });

  $(togglerBars).click(function(event) {
    toggleNavbar();
  });

  $(telegram).click(function(event) {
    const overlay = $(".body__overlay");

    $(overlay).show();
    $(overlay).css("pointer-events", "all");
    $(overlay).append('<img class="lightbox__image" src="../images/styles/telegram-qr.svg"/>');
  });

  function toggleNavbar() {
    if($(navlist).is(":visible")) {
      $(navlist).css("display", "none");
    } else {
      $(navlist).css("display", "flex");
    }
  }

  function toggleNavbarToggler() {
    if(window.screen.width >= 576) {
      $(togglerBars).hide();
    } else {
      $(togglerBars).show();
    }
  }

  function checkSiteChange() {
    var current_page_URL = location.href;
    $( "a" ).each(function() {
       if ($(this).attr("href") !== "#") {
         var target_URL = $(this).prop("href");
         if (target_URL == current_page_URL) {
            $(".navbar__list__item__link").each(function(link) {
              $(link).removeClass("active");
            });
            $(this).addClass('active');
            return false;
         }
       }
    });
  }
});
