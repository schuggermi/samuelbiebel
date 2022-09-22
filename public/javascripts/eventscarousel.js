"use strict";

jQuery(document).ready(function($) {
  let intervals = [];
  $.ajax({
    method: 'GET',
    url: '/events/api'
  })
  .then(events => {
    for(let i = 0; i < events.length; i++) {
      const EVENT = events[i];
      let slides = $(".events__flyer__carousel__slide__" + EVENT._id);
      let dots = $(".events__flyer__carousel__dot__" + EVENT._id);
      let slideIndex = slides.length;
      let currentEventsSlide = 0;
      let carouselInterval;

      setSlide(currentEventsSlide, slides, currentEventsSlide, slideIndex, dots);
      // setCarouselInterval(slides, currentEventsSlide, slideIndex, dots, carouselInterval);

      // $(".events__flyer__carousel__prev__" + EVENT._id).click(function (event) {
      //   plusEventsSlide(-1, slides, currentEventsSlide, slideIndex, dots);
      //   clearInterval(carouselInterval);
      //   setCarouselInterval(slides, currentEventsSlide, slideIndex, dots, carouselInterval);
      // });
      //
      // $(".events__flyer__carousel__next__" + EVENT._id).click(function (event) {
      //   plusEventsSlide(+1, slides, currentEventsSlide, slideIndex, dots);
      //   clearInterval(carouselInterval);
      //   setCarouselInterval(slides, currentEventsSlide, slideIndex, dots, carouselInterval);
      // });

      $(".events__flyer__carousel__dot__" + EVENT._id).click(function (event) {
        setDot($(this).index(), dots);
        setSlide($(this).index(), slides, currentEventsSlide, slideIndex, dots);
        // clearInterval(carouselInterval);
        // setCarouselInterval(slides, currentEventsSlide, slideIndex, dots, carouselInterval);
      });

      // $(".events__flyer__carousel__slide__" + EVENT._id).mouseenter(function (event) {
      //   clearInterval(carouselInterval);
      // });
      //
      // $(".events__flyer__carousel__slide__" + EVENT._id).mouseleave(function (event) {
      //   setCarouselInterval(slides, currentEventsSlide, slideIndex, dots, carouselInterval);
      // });
    }

    function setCarouselInterval(slides, currentEventsSlide, slideIndex, dots, carouselInterval) {
      carouselInterval = setInterval(function() {
        setSlide(currentEventsSlide +1, slides, currentEventsSlide, slideIndex, dots);
      }, 4000);
    }

    function plusEventsSlide(slideCount, slides, currentEventsSlide, slideIndex, dots) {
      setSlide(currentEventsSlide + slideCount, slides, currentEventsSlide, slideIndex, dots);
    }

    function setSlide(slide, slides, currentEventsSlide, slideIndex, dots) {
      let counter;

      for(let i = 0; i <= slides.length; i++) {
        $(slides[i]).css("display", "none");
      }
      currentEventsSlide = slide;
      if(currentEventsSlide > slideIndex-1 || currentEventsSlide <= 0) {
        currentEventsSlide = 0;
      }
      $(slides[currentEventsSlide]).css("display", "flex");
      setDot(currentEventsSlide, dots);
    }

    function setDot(dot, dots) {
      let counter;

      for(let i = 0; i <= dots.length; i++) {
        $(dots[i]).removeClass("dot-active");
      }
      $(dots[dot]).addClass("dot-active");
    }
  });
});
