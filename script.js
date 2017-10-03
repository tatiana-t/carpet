var carpet = document.getElementById('dataFile');
var btn = document.getElementById('chose');
var table = document.getElementById('info');
var form = document.getElementById('form');
var search = document.getElementById('search');
var file;

var result = document.getElementById('result');
var space = document.getElementById('space');
var spans = space.getElementsByTagName('span');
var searchOnPage = document.getElementById('searchOnPage');



searchOnPage.oninput = function() {
  for (var i = 0; i < spans.length; i++) {
    spans[i].style.backgroundColor = 'transparent';
  }
  
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i].innerHTML;
    span = span.toLowerCase();
    
  if (span.indexOf(searchOnPage.value, 0) >= 0) {
    spans[i].style.backgroundColor = 'yellow';
    //result.innerHTML = span;
  }
}
}

carpet.onchange = function () {
  carpet = document.getElementById('dataFile').files[0];
  // carpet = JSON.parse(this.responseText);
  carpet = carpet.path;
  //console.log(carpet.path);
  //space.innerHTML = carpet[0].Collection;

  //var reader = new FileReader

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      file = JSON.parse(this.responseText);
      //console.log(file);
      //space.innerHTML = file;
    }
  };

  xhr.open('GET', carpet, true);
  xhr.send();

  stepToSearch();
}

function stepToSearch() {

  var x = document.getElementById('search');
  x.removeAttribute('disabled');
  var inputFile = document.querySelector('.chose-btn-wrap');
  inputFile.style.display = 'none';


}

var info;
search.oninput = function () {
  info = search.value;
  //console.log(info);
  searchCarpet(info);
}
var count = 0;

function searchCarpet(info) {
  //console.log(file);
  for (var i = 0; i < file.length; i++) {
    count = 0;
    var inner = file[i].article.info;

    if (info == file[i].article) {
      //console.log(file[i]);
      count++;
      showCarpet(file[i]);
    }
  }
}

function showCarpet(obj) {
  //console.log(obj);
    for (prop in obj) {
      var data = document.createElement('span');
      data.style.display = 'block';
      data.innerHTML = prop + ': ' + obj[prop];
      space.appendChild(data);
      //console.log(prop + ' ' + obj[prop]);
      var newObj = obj[prop];
      if (typeof newObj == 'object') {
        showCarpet(newObj);
  
      }
    }
//  var content = document.getElementById('content');
//  var string = document.createElement('tr');
//  var cell;
//  var amount;
//  // var sizes = obj.properties.length;
//
//  table.classList.add('active');
//
//  //Article
//  cell = createCell();
//  cell.setAttribute('rowspan', count);
//  cell.innerHTML = obj.article;
//  string.appendChild(cell);
//
//
//  //Collection
//  cell = createCell();
//  searchInArrayOfObjects(obj.properties);
//  cell.setAttribute('rowspan', amount);
//  cell.innerHTML = obj.Collection;
//  string.appendChild(cell);

  //  for (var i = 0; i < obj.properties.length; i++) {
  //    var properties = obj.properties;
  //    properties[i].width;
  //    properties[i].height;
  //    
  //    var shops = properties[i].length
  //  }

//
//  function searchInArrayOfObjects(obj) {
//    for (var i = 0; i < obj.length; i++) {
//      
//      if (obj === file[i]) {
//        amount = obj.length;
//      } else if (obj === file[i].properties) {
//        for (var i = 0; i < obj.length; i++) {
//          amount = obj[i].properties.length;
//
//        }
//      }
//
//      return amount;
//    }
//  }
//
//  // Sizes
//
//  //obj.properties.length;
//  cell = createCell();
//
////  function XXX(obj.properties) {
////    for (var i = 0; i < obj.length; i++) {
////      amount = obj.properties[i].properties.length;
////
////    }
////  }
//
//
//
//  searchInArrayOfObjects(obj.properties.properties)
//  cell.setAttribute('rowspan', amount);
//  //cell.innerHTML = obj.properties.width + ' x ' + obj.properties.height;
//  string.appendChild(cell);
//
//  content.appendChild(string);
//}
//
//function createCell() {
//  return cell = document.createElement('td');
//}
}
