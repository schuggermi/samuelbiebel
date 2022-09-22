"use strict";

jQuery(document).ready(function($) {
  let slides = $(".carousel__slide");
  let dots = $(".dot");
  let slideIndex = slides.length;
  let currentSlide = 0;
  let carouselInterval;

  if(window.location.pathname == '/') {
    setSlide(currentSlide);
    setCarouselInterval();  
  }

  $(".prev").click(function (event) {
    plusSlide(+1);
    clearInterval(carouselInterval);
    setCarouselInterval();
  });

  $(".next").click(function (event) {
    plusSlide(+1);
    clearInterval(carouselInterval);
    setCarouselInterval();
  });

  $(".dot").click(function (event) {
    setDot($(this).index());
    setSlide($(this).index());
    clearInterval(carouselInterval);
    setCarouselInterval();
  });

  $(".carousel__slide").mouseenter(function (event) {
    clearInterval(carouselInterval);
  });

  $(".carousel__slide").mouseleave(function (event) {
    setCarouselInterval();
  });


  function setCarouselInterval() {
    carouselInterval = setInterval(function() {
      setSlide(currentSlide +1);
    }, 4000);
  }

  function plusSlide(slideCount) {
    setSlide(currentSlide + slideCount);
  }

  function setSlide(slide) {
    let counter;

    for(let i = 0; i <= slides.length; i++) {
      $(slides[i]).css("display", "none");
    }
    currentSlide = slide;
    if(currentSlide > slideIndex-1 || currentSlide <= 0) {
      currentSlide = 0;
    }
    $(slides[currentSlide]).css("display", "flex");
    setDot(currentSlide);
  }

  function setDot(dot) {
    let counter;

    for(let i = 0; i <= dots.length; i++) {
      $(dots[i]).removeClass("dot-active");
    }
    $(dots[dot]).addClass("dot-active");
  }
});
