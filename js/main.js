$(document).ready(function () {

  var modelSpecs,
    modelPrice,
    modelSpecsHolder,
    modelPriceHolder;

  modelSpecsHolder = $('#modelspecs');
  modelPriceHolder = $('#modelprice');
  modelPriceUSDHolder = $('#modelpriceUSD');

  modelPrice = 0;
  modelSpecs = '';

  // Запуск функции при нажатии на радиокнопки
  $('#autoform input').on('change', function () {
    calculatePrice();
    compileSpecs();
    calculateUSD();
  });

  // Запуск функции при старте страницы
  calculatePrice();
  compileSpecs();
  calculateUSD();

  // Функция выбора цвета
  $('#colorsselector .coloritem').on('click', function () {
    var imgPath;
    imgPath = $(this).attr('data-img-path');
    console.log(imgPath);
    // $('#imgholder img').attr('src', imgPath); // Эту строку заменяют рти строки ниже

    $('#imgholder img').fadeOut(100, function () { // Выше мы ввели переменную var $carImg = $('#imgholder img');
      $('#imgholder img').attr('src', imgPath).fadeIn(100);
    });
  });

  function calculatePrice() {
    var modelPriceEngine = $('input[name=engine]:checked', '#autoform').val();
    var modelPriceTransmission = $('input[name=transmission]:checked', '#autoform').val();
    var modelPricePackage = $('input[name=package]:checked', '#autoform').val();

    modelPriceEngine = parseInt(modelPriceEngine);
    modelPriceTransmission = parseInt(modelPriceTransmission);
    modelPricePackage = parseInt(modelPricePackage);

    modelPrice = modelPriceEngine + modelPriceTransmission + modelPricePackage;
    // alert(modelPrice);
    modelPriceHolder.text(addSpace(modelPrice) + ' гривен');
  };

  function compileSpecs() {
    modelSpecs = $('input[name=engine]:checked + label', '#autoform').text();
    modelSpecs = modelSpecs + ', ' + $('input[name=transmission]:checked + label', '#autoform').text();
    modelSpecs = modelSpecs + ', ' + $('input[name=package]:checked + label', '#autoform').text();
    // alert(modelSpecs);
    modelSpecsHolder.text(modelSpecs);
  };

  // Функция которая добавляет пробелы
  function addSpace(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
  };

  // Получаем курс валют
  // var currencyUrl = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5';
  // var rurUsdRate = 0;

  // $ajax({
  //   url: currencyUrl,
  //   cache: false,
  //   success: function(html){
  //     console.log(html.query.results.rate[0].Rate);
  //     rurUsdRate = html.query.results.rate[0].Rate;
  //     calculateUSD();
  //   }
  // });

  // Формула конвертации гривны в доллары
  function calculateUSD() {
    // var modelPriceUSD = modelPrice / rurUsdRate;
    var modelPriceUSD = modelPrice / 29.5;
    // alert(modelPriceUSD);
    modelPriceUSDHolder.text('$ ' + addSpace(modelPriceUSD.toFixed(0))); // .toFixed() В скобках пишем сколько знаков после запятой
  }


});