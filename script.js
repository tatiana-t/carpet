//вывод таблицы со всеми коврами
var table = document.getElementById('table');
var tableContent = document.getElementById('tableContent');
var inputSearch = document.getElementById('inputSearch');

var inputFile = document.getElementById('inputFile');
var inputFileEnabled;

var collectionSelector = document.getElementById('collectionSelector');
var sizeSelector = document.getElementById('sizeSelector');
var selectedArticle;
var selectedArticleArr = [];
var selectedCollectionIndex;
var citySelector = document.getElementById('citySelector');
var selectedSizeIndex;
var selectedCity;

inputFile.onchange = function () {

  inputFile = document.getElementById('inputFile').files[0];
  if (inputFile) {
    inputFile = inputFile.path;
    extCheck(inputFile);
  }



  function extCheck(ext) {
    if (ext.indexOf('.json') === ext.length - 5) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
          inputFileEnabled = JSON.parse(this.responseText);
        }
      };

      xhr.open('GET', inputFile, true);
      xhr.send();

      showTable();
    } else {
      alert('Неверный формат файла')
    }
  }

}



inputSearch.oninput = searchArticle;
collectionSelector.onchange = searchCollection;
sizeSelector.onchange = searchSize;
citySelector.onchange = searchCity;

function showTable() {

  //переносим кнопку выбора файла
  var inputFileButton = document.querySelector('.inputFileWrapper');
  inputFileButton.classList.add('secondView');

  //выводим селекторы
  var selectorWrap = document.getElementById('selectorWrap');
  selectorWrap.classList.add('active');


  //разблокируем строку поиска
  inputSearch.removeAttribute('disabled');
  inputSearch.value = '';

  //обнуляем селекторы
  resetData(collectionSelector);
  resetData(sizeSelector);
  resetData(citySelector);


}



function searchArticle() {

  selectedArticle = inputSearch.value;
  if (selectedArticle) {

    inputFileEnabled.forEach(function (value, i, inputFileEnabled) {
      if (inputFileEnabled[i].article === selectedArticle) {

        selectedArticleArr.push(inputFileEnabled[i]);
        resetData(collectionSelector);
        resetData(sizeSelector);
        resetData(citySelector);

        //создаем опции выбора, вставляем в них значение коллекции
        var option = new Option(inputFileEnabled[i].Collection, inputFileEnabled[i].Collection);
        //option.appendChild(document.createTextNode(collectionArray[i]));
        collectionSelector.appendChild(option);

      }
    });

    //разблокируем выбор коллекции
    collectionSelector.removeAttribute('disabled');
  } else {
    resetData(collectionSelector);
    resetData(sizeSelector);
    resetData(citySelector);
    resetData(table);

  }


}



function searchCollection() {
  selectedCollectionIndex = -1;
  //определяем выбранную опцию
  var selectedCollection;

  var option = collectionSelector.options;
  for (var i = 0; i < option.length; i++) {
    if (option[i].selected) {
      selectedCollection = option[i].value;
    }

  }
  //узнаем индекс эемента в массиве selectedArticleArr с нужной коллекцией
  for (var i = 0; i < selectedArticleArr.length; i++) {
    if (selectedArticleArr[i].Collection === selectedCollection) {

      selectedCollectionIndex = i;
    }

  }

  function searchSizes() {
    if (selectedCollectionIndex > -1) {
      var sizes = selectedArticleArr[selectedCollectionIndex].properties;
      for (var i = 0; i < sizes.length; i++) {

        var size = sizes[i].width + ' x ' + sizes[i].height;

        var option = new Option(size, i); // i - индекс элемента с данным размером

        sizeSelector.appendChild(option);
      }
    }

  }

  resetData(sizeSelector);
  resetData(citySelector);
  searchSizes();

  //разблокируется выбор размеров
  sizeSelector.removeAttribute('disabled');


}



function searchSize() {

  //узнать какой размер выбран

  var option = sizeSelector.options;
  for (var i = 0; i < option.length; i++) {
    if (option[i].selected) {
      selectedSizeIndex = +option[i].value;
    }
  }

  var selectedSize = selectedArticleArr[selectedCollectionIndex].properties[selectedSizeIndex];

  resetData(citySelector);
  searchCities();



  function searchCities() {
    if (selectedSize) {
      for (var i = 0; i < selectedSize.properties.length; i++) {

        //составляется список городов для выбора
        var city = selectedSize.properties[i].city;

        //убрать повторяющиеся города
        if (i > 0) {
          if (selectedSize.properties[i].city !== selectedSize.properties[i - 1].city) {
            var option = new Option(selectedSize.properties[i].city, selectedSize.properties[i].city);
            //console.log(option);
            citySelector.appendChild(option);
          }
        }
      }
    }

  }

  //разблокируем выбор города
  citySelector.removeAttribute('disabled');
}



function searchCity() {

  var option = citySelector.options;
  for (var i = 0; i < option.length; i++) {
    if (option[i].selected) {
      selectedCity = option[i].value;

    }
  }
  showCarpet();
};

function showCarpet() {
  tableContent.innerHTML = '';
  var size = selectedArticleArr[selectedCollectionIndex].properties[selectedSizeIndex];
  for (var i = 0; i < size.properties.length; i++) {
    if (size.properties[i].city === selectedCity) {

      var row = document.createElement('tr');
      var td = document.createElement('td');
      td.innerHTML = size.properties[i].shopTitle;
      row.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = size.properties[i].shop;
      row.appendChild(td);

      td = document.createElement('td');
      var price = Number.prototype.toFixed.call(parseFloat(size.properties[i].price) || 0, 2),
        //заменяем точку на запятую
        price_sep = price.replace(/(\D)/g, ","),
        //добавляем пробел как разделитель в целых
        price_sep = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      price = price_sep + ' руб.';
      td.innerHTML = price;
      row.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = size.properties[i].discount;
      row.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = size.properties[i].quantity;
      row.appendChild(td);

      tableContent.appendChild(row);
    }

  }
  //выводим таблицу

  table.classList.add('active');
}

function resetData(data) {
  var item;
  if (data === table) {
    data.classList.remove('active');
  } else {
    if (data === collectionSelector) {
      item = 'коллекцию';
    } else if (data === sizeSelector) {
      item = 'размер';
    } else if (data === citySelector) {
      item = 'город';
    }

    data.innerHTML = '';
    var option = new Option('Выберите ' + item, 'default');
    option.setAttribute('selected', '');
    data.appendChild(option);
    data.setAttribute('disabled', '')

    resetData(table);
  }
}
