$(function() {
  var input = document.querySelectorAll('input');
  var inputs = [];
  for (var i = 0; i <= input.length; i++) {
    inputs.push(input[i]);
  }

  console.log(inputs[2]);

  $('input').change(function () {


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
  });
});