"use strict";

jQuery(document).ready(function($) {
  let seriesContainer = $(".galery__wrapper");
  let carousel = $(".carousel");
  let medicationandaddictionContainer = $(".galery__wrapper--medicationandaddiction");

  checkLightbox("3feelings2021");

  // SERIES
  $.ajax({
    method: 'GET',
    url: '/galerie/api'
  })
  .then(series => {
    for(let i = 0; i < series.length; i++) {
      const serie = series[i];
      $(seriesContainer).append(
        '<a href="/galerie/medicationandaddiction" class="galery__item galery__wrapper__item dropshadow " style="background-image: url(../images/series/' + serie.image + '.gif)">' +
        // '<img class="galery__image" src="../images/series/' + serie.image + '.png" alt="Auswahl zur Serie ' + serie.title + '"/>' +
        '<h3 class="galery__item__title textshadow">' + serie.title + '</h3>' +
        '</div></a>'
      );
    }

    // spätere extra carousel
      $(carousel).after(
        '<a href="/galerie/medicationandaddiction" class="series__announcement galery__item galery__wrapper__item dropshadow" style="margin-top: 3rem; background-image: url(../images/series/medicationandaddiction.png)">' +
        '<h3 class="galery__item__title textshadow">medication & addiction</h3>' +
        '</div></a>'
      );
  });

  // MEDICATION & ADDICTION GALERY
  $.ajax({
    method: 'GET',
    url: '/galerie/medicationandaddiction/api'
  })
  .then(pictures => {
    for(let i = 0; i < pictures.length; i++) {
      const picture = pictures[i];
      if(!picture.cite) { picture.cite = ""; }
      $(medicationandaddictionContainer).append(
          '<div class="galery__wrapper__item picture__card textshadow picture__card__' + picture.image + '">' +
          '<img class="picture__card__image picture__card__image__' + picture.image + ' hover" src="../images/galery/medicationandaddiction/' + picture.image + '.gif">' +
          '<h3 class="picture__card__item picture__card__title picture__card__title__' + picture.image + '">' + picture.title + '</h3>' +
          '<br>' +
          '<p class="picture__card__item picture__card__autor">' + picture.publisher + '</p>' +
          '<p class="picture__card__item">' + picture.width + 'x' + hasLength(picture) + picture.height + ' cm</p>' +
           hasPills(picture) +
           '<div class="picture__card__footer">' +
           getButtonHTML(picture) +
           getDescriptionToggler(picture) +
           '</div>' +
           getDescription(picture) +
           '</div>'
        );
        checkLightbox(picture.image);
        checkTextToggle(picture);
    }
  });

  function getSoldStatus(picture) {
    return picture.sold;
  }

  function getButtonHTML(picture) {
    if(getSoldStatus(picture) == false) {
      return '<a class="picture__card__btn btn hover katalog" target="_blank" href="../images/pdf/portfolio-ruepel.pdf">Katalog <span class="fa-solid fa-file-pdf"></span></a>';
    } else {
      return '<a class="picture__card__btn btn sold">SOLD</a>';
    }
  }

  function hasPills(picture) {
    if(picture.pills == 0) {
      return '';
    } else {
      return '<p class="picture__card__item">' + picture.pills + ' Pills</p>';
    }
  }

  function hasCite(picture) {
    if(picture.cite == "" || picture.cite == null || picture.cite == undefined) {
      return '';
    } else {
      return '<p class="picture__card__item picture__card__cite">"' + picture.cite + '"</p>';
    }
  }

  function getDescriptionToggler(picture) {
    if(checkDescription(picture) == false || isSold(picture) == true) {
      return '';
    } else {
      return '<p class="picture__card__text__toggler toggler__' + picture.image + ' hover"><span class="fa-solid fa-arrow-right arrow__' + picture.image + '"></span> Beschreibung</p>';
    }
  }

  function getDescription(picture) {
    if(checkDescription(picture) == false || isSold(picture) == true) {
      return '';
    } else {
      return '<p class="picture__card__text text__' + picture.image + '"><small>' + picture.description + '</small></p>';
    }
  }

  function checkDescription(picture) {
    if(picture.description == "" || picture.description == null || picture.description == undefined) {
      return false;
    } else {
      return true;
    }
  }

  function isSold(picture) {
    if(picture.sold == false || picture.sold == "" || picture.sold == null || picture.sold == undefined) {
      return false;
    } else {
      return true;
    }
  }

  function hasLength(picture) {
    if(picture.length == 0 || picture.length == null || picture.length == undefined) {
      return '';
    } else {
      return picture.length + "x";
    }
  }

  function setMaxHeight(image) {
    let card = $(".picture__card__" + image);
    let cardHeight = Math.round($(".picture__card__" + image).height());
    let description = $(".text__" + image);
    let descriptionHeight = Math.round($(description).height());

    let newHeight = cardHeight + descriptionHeight;

    $(card).css({"max-height": newHeight+"px"});
  }

  function checkLightbox(image) {
    const img = $(".picture__card__image__" + image);

    $(img).click(function(event) {
      const overlay = $(".body__overlay");

      $(overlay).show();
      $(overlay).css("pointer-events", "all");
      $(overlay).append('<img class="lightbox__image" src="../images/galery/medicationandaddiction/' + image + '.gif"/>');
    });
  }

  function checkTextToggle(picture) {
    const toggler = $(".toggler__" + picture.image);
    const text = $(".text__" + picture.image);

    $(toggler).click(function(event) {
      if($(text).is(":visible")) {
        toggleArrow(picture, true);
      } else {
        toggleArrow(picture, false);
      }
      $(text).toggle();
    });
  }

  function toggleArrow(picture, rotated) {
    if(rotated) {
      $(".arrow__" + picture.image).css("transform", "rotate(0deg)");
    } else {
      $(".arrow__" + picture.image).css("transform", "rotate(90deg)");
    }
  }
});

// for(picture of pictures) {
//   $(galeryContainer).appendChild(
//     '<div class="picture__card grid__container__item">' +
//     '<h2>' + picture.title + '</h2>' +
//     '</div>'
//   );
// }

// <div class="card grid__container__item">
//   <h2>Dies ist ein Test</h2>
// </div>
