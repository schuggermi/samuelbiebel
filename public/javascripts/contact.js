"use strict";

jQuery(document).ready(function($) {
  let form = $(".contact__form");
  let formSubmit = $(".contact__submit");
  let firstName = $("input[name=contactFirstName]");
  let lastName = $("input[name=contactLastName]");
  let email = $("input[name=contactEmail]");
  let message = $("textarea[name=contactMessage]");
  let checkbox = $(".contact__checkbox");
  let warning = $(".contact__warning");
  let ready = false;

  $(form).keypress(function(event) {
    if(event.which == 13) {
      event.preventDefault();
      checkInputs();
    }
  });

  $(formSubmit).click(function(event) {
    event.preventDefault();
    checkInputs();
  });

  function checkInputs() {
    if(!$(firstName).val()) {
      $(warning).show();
      $(warning).css("color", "rgba(231, 76, 60, 0.8)");
      $(warning).text("Bitte geben Sie Ihren Vornamen an.");
    } else
    if(!$(lastName).val()) {
      $(warning).show();
      $(warning).css("color", "rgba(231, 76, 60, 0.8)");
      $(warning).text("Bitte geben Sie Ihren Nachnamen an.");
    } else
    if(!$(email).val()) {
      $(warning).show();
      $(warning).css("color", "rgba(231, 76, 60, 0.8)");
      $(warning).text("Bitte geben Sie Ihre E-Mail-Adresse an.");
    } else
    if(!isEmail($(email).val())) {
      $(warning).show();
      $(warning).css("color", "rgba(231, 76, 60, 0.8)");
      $(warning).text("Bitte geben Sie eine existierende E-Mail-Adresse an.");
    } else
    if(!$(message).val()) {
      $(warning).show();
      $(warning).css("color", "rgba(231, 76, 60, 0.8)");
      $(warning).text("Bitte schreiben Sie eine Nachricht.");
    } else
    if(!$(checkbox).is(":checked")) {
      $(warning).show();
      $(warning).css("color", "rgba(231, 76, 60, 0.8)");
      $(warning).text("Bitte stimmen Sie den Datzenschutzrichtlinien zu.");
    } else {
      validateContactForm();
    }
  }

  function clearValues() {
    $(firstName).val("");
    $(lastName).val("");
    $(email).val("");
    $(message).val("");
    $(checkbox).prop('checked', false);
  }

  async function validateContactForm() {
     await $.ajax({
      method: "POST",
      url: "/kontakt",
      contentType: 'application/json',
      data: JSON.stringify({
        "firstName": $(firstName).val(),
        "lastName": $(lastName).val(),
        "email": $(email).val(),
        "message": $(message).val(),
      }),
      success: function() {
        $(warning).css("color", "rgba(46, 204, 113, 0.8)");
        $(warning).text("Deine Nachricht wurde erfolgreich abgeschickt.");
        $(warning).show();
        clearValues();
      }
      });
    }

    function isEmail(email) {
      let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }
});
