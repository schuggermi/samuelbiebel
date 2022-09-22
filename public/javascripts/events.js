"use strict";

jQuery(document).ready(function($) {
  const EXHIBITIONS = $(".events__exhibitions__wrapper");
  const PARTYS = $(".events__partys__wrapper");
  let exhibitionsCount = 0;
  let partysCount = 0;

  $.ajax({
    method: 'GET',
    url: '/events/api'
  })
  .then(events => {
    for(let i = 0; i < events.length; i++) {
      const EVENT = events[i];
      checkEventTypeAndAdd(EVENT);
      checkLightbox(EVENT);
      isEventFinished(EVENT);
    }

    if(exhibitionsCount == 0) {
      $(EXHIBITIONS).append('<h4 style="margin-top: 3rem;">Momentan sind noch keine Ausstellungen bekannt.<h4>');
    }

    if(partysCount == 0) {
      $(PARTYS).append('<div style="margin-top: 3rem;">' +
        '<img width="40%" src="../images/styles/schockerlogo.png">' +
        '<h4 style="font-weight: 300;">Schocker events<br>02.07.2022 von 22 - 07 Uhr<h4>' +
        '</div>');
    }

    function isEventFinished(EVENT) {
      const today = new Date().toISOString();
      const finished = new Date(EVENT.finished).toISOString();

      if(finished < today) {
        $(".events__flyer__carousel__slide__" + EVENT._id).append('<p class="events__finished dropshadow">Beendet</p>');
      }
    }

    function formatDate(date) {
      let d = date;
      let month = (d.getMonth() + 1).toString();
      let day = d.getDate().toString();
      let year = d.getFullYear();
      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }

      return [year, month, day].join('-');
    }

    function checkEventTypeAndAdd(EVENT) {
      if(EVENT.type == "exhibition") {
        exhibitionsCount++;
        if(EVENT.flyers.length > 0) {
            $(EXHIBITIONS).append(
            '<div class="events__flyer__carousel events__carousel__' + EVENT._id + '">' +
              '<div class="events__flyer__carousel__dot__wrapper__' + EVENT._id + '" style="text-align: center;">' +
              '</div>' +
              // '<a class="events__flyer__carousel__prev events__flyer__carousel__prev__' + EVENT.id + ' drop-shadow">&#10094;</a>' +
              // '<a class="events__flyer__carousel__next events__flyer__carousel__next__' + EVENT.id + ' drop-shadow">&#10095;</a>' +
            '</div>');

            for(let i = 0; i < EVENT.flyers.length; i++) {
              $('.events__flyer__carousel__dot__wrapper__' + EVENT._id).append(
                '<span class="events__flyer__carousel__dot events__flyer__carousel__dot__' + EVENT._id + '"></span>');

              $('.events__carousel__' + EVENT._id).append(
                '<div class="events__flyer__carousel__slide events__flyer__carousel__slide__' + EVENT._id + ' fade">' +
                  '<img class="events__flyer events__flyer__' + EVENT.flyers[i] + '" src="../images/events/exhibitions/' + EVENT.flyers[i] + '.gif">' +
                '</div>');
            }
        } else {
          $(EXHIBITIONS).append('<img class="events__flyer events__flyer__' + EVENT.flyers[0] + ' boxshadow" src="../images/events/exhibitions/' + EVENT.flyers[0] + '.png" alt="Ausstellung Flyer"/>');
        }
      }

      if(EVENT.type == "party") {
        partysCount++;
        if(EVENT.flyers.length > 0) {
            $(PARTYS).append(
            '<div class="events__flyer__carousel events__carousel__' + EVENT._id + '">' +
              '<div class="events__flyer__carousel__dot__wrapper__' + EVENT._id + '" style="text-align: center;">' +
              '</div>' +
              // '<a class="events__flyer__carousel__prev events__flyer__carousel__prev__' + EVENT.id + ' drop-shadow">&#10094;</a>' +
              // '<a class="events__flyer__carousel__next events__flyer__carousel__next__' + EVENT.id + ' drop-shadow">&#10095;</a>' +
            '</div>');

            for(let i = 0; i < EVENT.flyers.length; i++) {
              $('.events__flyer__carousel__dot__wrapper__' + EVENT._id).append(
                '<span class="events__flyer__carousel__dot events__flyer__carousel__dot__' + EVENT._id + '"></span>'+
                '<a class="events__finished events__finished__' + EVENT._id + '" style="">Finished</a>');

              $('.events__carousel__' + EVENT._id).append(
                '<div class="events__flyer__carousel__slide events__flyer__carousel__slide__' + EVENT._id + ' fade">' +
                  '<img class="events__flyer events__flyer__' + EVENT.flyers[i] + '" src="../images/events/exhibitions/' + EVENT.flyers[i] + '.gif">' +
                '</div>');
            }
        } else {
          $(PARTYS).append('<img class="events__flyer events__flyer__' + EVENT.flyers + ' boxshadow" src="../images/events/partys/' + EVENT.flyers + '.gif" alt="Party Flyer"/>');
        }
      }
    }

    function checkLightbox(EVENT) {
      for(let i = 0; i <= EVENT.flyers.length; i++) {
        $(".events__flyer__" + EVENT.flyers[i]).click(function(event) {
          const overlay = $(".body__overlay");

          $(overlay).show();
          $(overlay).css("pointer-events", "all");
          if(EVENT.type == "exhibition") {
            $(overlay).append('<img class="lightbox__image__event" src="../images/events/exhibitions/' + EVENT.flyers[i] + '.gif" alt="' + EVENT.flyers[i] + '"/>');
          }

          if(EVENT.type == "party") {
            $(overlay).append('<img class="lightbox__image__event" src="../images/events/partys/' + EVENT.flyers[i] + '.gif" alt="' + EVENT.flyers[i] + '"/>');
          }
        });
      }
    }

    // <div class="events__exhibitions__wrapper">
    //   <h2 class="events__title">Ausstellungen</h2>
    //   <img class="events__exhibitions__flyer dropshadow__icon" src="../images/events/exhibitions/hardtoswallow.png" alt="Hard to swal low - Ausstellung Flyer Ruepel">
    // </div>
  });
});
