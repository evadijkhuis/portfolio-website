(function ($, window, document, _, undefined) {

  'use strict';

  var pagesCount;
  var prevPage = 0;
  var currentPage = 0;
  var $pages;
  var $pagers;
  var $whiteOverlay;
  function movePage(){
    // $pages.css('transform', 'translate(0, ' + (-currentPage * 100/pagesCount) + '%)');
    $pagers.css('background-size', '100% 2px');
    $('.pager:eq(' + currentPage + ')').css('background-size', '40% 6px');
    // $('.page').css('z-index', 0);
    // $('.page:eq(' + currentPage + ')').css('z-index', 1);
    var $prevPage = $('.page:eq(' + prevPage + ')');
    var $currPage = $('.page:eq(' + currentPage + ')');

    if (currentPage < prevPage) {
      $whiteOverlay.addClass('page-up');
      $currPage.addClass('page-up');
      $prevPage.addClass('page-up');
    }
    $whiteOverlay.addClass('slide-in');
    $prevPage.addClass('slide-out');
    setTimeout(function() {
      $whiteOverlay.removeClass('slide-in').addClass('slide-out');
      $prevPage.removeClass('slide-out active page-up');
      $currPage.addClass('slide-in active');
      setTimeout(function() {
        $whiteOverlay.removeClass('slide-out page-up');
        $currPage.removeClass('slide-in page-up');
      }, 500);
    }, 500);

    prevPage = currentPage;
  }

  var pageDown = _.throttle(function (){
    if (currentPage < pagesCount - 1){
      currentPage++;
      movePage();
    }
  }, 1000, {trailing: false});
  var pageUp = _.throttle(function (){
    if (currentPage > 0){
      currentPage--;
      movePage();
    }
  }, 1000, {trailing: false});

  $(function () {
    $pages =  $('.pages');
    $pagers = $('.pager');
    $whiteOverlay = $('.white-overlay');
    pagesCount = $('.page').length;
    $(window).on('mousewheel DOMMouseScroll', function(event){
      if (event.originalEvent.wheelDelta > 20 || event.originalEvent.detail < -20) {
        pageUp();
      } else if (event.originalEvent.wheelDelta < -20 || event.originalEvent.detail > 20){
        pageDown();
      }
    });

    $('.pager').click(function(event){
      currentPage = $(event.target).index();
      movePage();
    });
    // movePage();
  });

})(jQuery, window, document, _);
