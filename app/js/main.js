$(function() {

  $('.owl-carousel').owlCarousel({
    items:1,
    margin:10,
    autoHeight:true
  });


function initMenuButtons() {
  $('.header .holder').prepend('<div class="open">');
  $('.header .holder').prepend('<div class="close">');
  $('.open').css({'z-index': '0'});
  $('.close').css({'z-index': '0'});
}



  var windowWidth = $( window ).width();
  if(windowWidth < 960) {
    initMenuButtons()

  }


  $('.open').bind('click', function () { open() });

  function open() {
    $('.main-menu__list').css({'display': 'block'});
    $('.open').hide();
    $('.close').show();
  }

  $('.close').bind('click', function () { close() });

  function close() {
    $('.main-menu__list').css({'display': 'none'});
    $('.close').hide();
    $('.open').show();

  }

  if(windowWidth > 960) {
    $('.open').css({'z-index': '-1'});
    $('.close').css({'z-index': '-1'});
  }


// $('input').change(function () {

  $('.form').validate({

    rules: {
      harvest: {
        digits: true
      },
      cost: {
        digits: true
      },
      area: {
        digits: true
      }
    },
    messages: {
      harvest: {
        digits: 'не верное значение'
      },
      cost: {
        digits: 'не верное значение'
      },
      area: {
        digits: 'не верное значение'
      }
    }


  });




//   $.fn.clearValidation = function(){var v = $(this).validate();$('[name]',this).each(function(){v.successList.push(this);v.showErrors();});v.resetForm();v.reset();};
// //used:
//   $("#form").clearValidation();






});