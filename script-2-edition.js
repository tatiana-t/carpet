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
      console.log(inputFileEnabled);
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

  //  //выводим таблицу
  //  var table = document.getElementById('table');
  //  table.classList.add('active');

  //выводим селекторы
  var selectorWrap = document.getElementById('selectorWrap');
  selectorWrap.classList.add('active');

  //разблокируем строку поиска
  inputSearch.removeAttribute('disabled');


}
var collectionSelector = document.getElementById('collectionSelector');
var sizeSelector = document.getElementById('sizeSelector');
var selectedArticle;
inputSearch.oninput = function () {
  selectedArticle = inputSearch.value;
  var collectionArray = [];

  inputFileEnabled.forEach(function (value, i, inputFileEnabled) {
    if (inputFileEnabled[i].article === selectedArticle) {

      //создать массив с коллекциями с данным артикулом
      collectionArray.push(inputFileEnabled[i].Collection);
    }
  });
  console.log(collectionArray);

  //элементы массива сделать опциями выбора в <select>

  collectionArray.forEach(function (value, i, collectionArray) {
    var option = new Option(collectionArray[i], collectionArray[i]);
    console.log(option);
    //option.appendChild(document.createTextNode(collectionArray[i]));
    collectionSelector.appendChild(option);
  });

  //разблокируем выбор коллекции
  collectionSelector.removeAttribute('disabled');  
}

collectionSelector.onchange = function () {
  //определяем выбранную опцию
  var selectedCollection;
  var option = collectionSelector.options;
  for (var i = 0; i < option.length; i++) {
    if (option[i].selected) {
      selectedCollection = option[i].value;
    }
  }
  console.log(selectedCollection);
  
  //в соответствии с выбранной опцией составляется массив опций размеров
  var sizesCollection = [];
  inputFileEnabled.forEach(function (value, i, inputFileEnabled) {
    if (inputFileEnabled[i].Collection === selectedCollection && inputFileEnabled[i].article === selectedArticle) {
      
      var size = {
        width: inputFileEnabled[i].propreties./*здесь нужен цикл по всем объектам проперти с размерами*/width,
        height: inputFileEnabled[i].propreties.height
      }
      
      sizesCollection.push(size);
    }
    
  })
  console.log(sizesCollection);
  
  //разблокируется выбор размеров
  sizeSelector.removeAttribute('disabled');
}

sizeSelector.onchange = function() {

}
