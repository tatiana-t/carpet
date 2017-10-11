//вывод таблицы со всеми коврами
var tableContent = document.getElementById('tableContent');
var inputSearch = document.getElementById('inputSearch');

var inputFile = document.getElementById('inputFile');
var inputFileEnabled;
inputFile.onchange = function () {

  inputFile = document.getElementById('inputFile').files[0];
  inputFile = inputFile.path;
  //console.log(inputFile);

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      inputFileEnabled = JSON.parse(this.responseText);
      //console.log(inputFileEnabled);
      //tableContent.innerHTML = inputFileEnabled;
      //tableContent.innerHTML = inputFileEnabled[0].Collection;
    }
  };

  xhr.open('GET', inputFile, true);
  xhr.send();

  showTable();
  
}
var collectionSelector = document.getElementById('collectionSelector');
var sizeSelector = document.getElementById('sizeSelector');
var selectedArticle;
var selectedArticleArr = [];

function showTable() {
  
  //переносим кнопку выбора файла
  var inputFileButton = document.querySelector('.inputFileWrapper');
  inputFileButton.classList.add('secondView');
  
  //выводим селекторы
  var selectorWrap = document.getElementById('selectorWrap');
  selectorWrap.classList.add('active');
  
  

  //разблокируем строку поиска
  inputSearch.removeAttribute('disabled');

  
}

inputSearch.oninput = searchArticle;

function searchArticle() {
  //collectionSelector.innerHTML = '';

  selectedArticle = inputSearch.value;


  inputFileEnabled.forEach(function (value, i, inputFileEnabled) {
    if (inputFileEnabled[i].article === selectedArticle) {

      selectedArticleArr.push(inputFileEnabled[i]);
      resetData(collectionSelector);
      resetData(sizeSelector);
      resetData(citySelector);

      //создаем опции выбора, вставляем в них значение коллекции
      var option = new Option(inputFileEnabled[i].Collection, inputFileEnabled[i].Collection);
      //console.log(option);
      //console.log(selectedArticleArr);
      //option.appendChild(document.createTextNode(collectionArray[i]));
      collectionSelector.appendChild(option);

    }
  });

  //разблокируем выбор коллекции
  collectionSelector.removeAttribute('disabled');
}

var selectedCollectionIndex;
collectionSelector.onchange = searchCollection;

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
  //console.log(selectedCollection);
  //console.log(selectedCollectionIndex);



  function searchSizes() {
    if (selectedCollectionIndex > -1) {
      var sizes = selectedArticleArr[selectedCollectionIndex].properties;
      for (var i = 0; i < sizes.length; i++) {
        // console.log(sizes.length);

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

var citySelector = document.getElementById('citySelector');
var selectedSizeIndex;

sizeSelector.onchange = searchSize;

function searchSize() {

  //узнать какой размер выбран

  var option = sizeSelector.options;
  for (var i = 0; i < option.length; i++) {
    if (option[i].selected) {
      selectedSizeIndex = +option[i].value;
    }
  }
  //console.log(selectedSizeIndex);

  var selectedSize = selectedArticleArr[selectedCollectionIndex].properties[selectedSizeIndex];

  resetData(citySelector);
  searchCities();



  function searchCities() {
    if (selectedSize) {
      for (var i = 0; i < selectedSize.properties.length; i++) {
        //console.log(selectedSize.properties.length);

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

var selectedCity;
citySelector.onchange = searchCity;

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
      td.innerHTML = size.properties[i].price;
      row.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = size.properties[i].discount;
      row.appendChild(td);

      tableContent.appendChild(row);
    }

  }
  //выводим таблицу
  var table = document.getElementById('table');
  table.classList.add('active');
}

function resetData(selector) {
  var item;
  if (selector === collectionSelector) {
    item = 'коллекцию';
  } else if (selector === sizeSelector) {
    item = 'размер';
  } else if (selector === citySelector) {
    item = 'город';
  }
  selector.innerHTML = '';
  var option = new Option('Выберите ' + item, 'default');
  option.setAttribute('selected', '');
  selector.appendChild(option);
  
  tableContent.innerHTML = '';
}
