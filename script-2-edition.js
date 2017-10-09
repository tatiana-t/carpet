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

function showTable() {
  //прячем кнопку выбора файла
  var inputFileWrapper = document.getElementById('inputFileWrapper');
  inputFileWrapper.classList.add('disabled');



  //выводим селекторы
  var selectorWrap = document.getElementById('selectorWrap');
  selectorWrap.classList.add('active');

  //разблокируем строку поиска
  inputSearch.removeAttribute('disabled');


}
var collectionSelector = document.getElementById('collectionSelector');
var sizeSelector = document.getElementById('sizeSelector');
var selectedArticle;
var selectedArticleArr = [];
inputSearch.oninput = function () {
  selectedArticle = inputSearch.value;


  inputFileEnabled.forEach(function (value, i, inputFileEnabled) {
    if (inputFileEnabled[i].article === selectedArticle) {

      selectedArticleArr.push(inputFileEnabled[i]);

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
collectionSelector.onchange = function () {
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
    var sizes = selectedArticleArr[selectedCollectionIndex].properties;
    for (var i = 0; i < sizes.length; i++) {
      // console.log(sizes.length);

      var size = sizes[i].width + ' x ' + sizes[i].height;

      var option = new Option(size, i); // i - индекс элемента с данным размером

      sizeSelector.appendChild(option);
    }
  }
  searchSizes();

  //разблокируется выбор размеров
  sizeSelector.removeAttribute('disabled');
}

var citySelector = document.getElementById('citySelector');
var selectedSizeIndex;

sizeSelector.onchange = function () {

  //узнать какой размер выбран

  var option = sizeSelector.options;
  for (var i = 0; i < option.length; i++) {
    if (option[i].selected) {
      selectedSizeIndex = +option[i].value;
    }
  }
  console.log(selectedSizeIndex);
  var selectedSize = selectedArticleArr[selectedCollectionIndex].properties[selectedSizeIndex];
  console.log(selectedSize);

  searchCities();

  function searchCities() {
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



  //разблокируем выбор города
  citySelector.removeAttribute('disabled');
}
var selectedCity;
citySelector.onchange = function () {

  var option = citySelector.options;
  for (var i = 0; i < option.length; i++) {
    if (option[i].selected) {
      selectedCity = option[i].value;
      
    }
  }
  showCarpet();

  function showCarpet() {
    tableContent.innerHTML = '';
    var size = selectedArticleArr[selectedCollectionIndex].properties[selectedSizeIndex];
    console.log(size.properties.length);
    console.log(selectedCity);
    for (var i = 0; i < size.properties.length; i++) {
      if (size.properties[i].city === selectedCity) {
        console.log('found');
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
        console.log(row);

        tableContent.appendChild(row);
      }
       console.log('not found');
    }
    //выводим таблицу
    var table = document.getElementById('table');
    table.classList.add('active');
  }

};
