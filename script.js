var carpet = document.getElementById('data');
var btn = document.getElementById('chose');
var space = document.getElementById('info');
var form = document.getElementById('form');
var search = document.getElementById('search');
//   carpet.onchange = function() {
//     carpet = document.getElementById('data').file;
//     console.log(carpet);
//   }
var file;
carpet.onchange = function () {
  carpet = document.getElementById('data').files[0];
  // carpet = JSON.parse(this.responseText);
  carpet = carpet.path;
  console.log(carpet.path);
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
}
var info;
search.oninput = function() {
  info = search.value;
  //console.log(info);
  searchCarpet(info);
}

function searchCarpet(info) {
  //console.log(file);
  for (var i = 0; i < file.length; i++) {
    var inner = file[i].article.info;
    
    if (info == file[i].article) {
      //console.log(file[i]);
      showCarpet(file[i]);
    }
  }
}
function showCarpet(obj) {
  for (prop in obj) {
    var data = document.createElement('span');
    data.style.display = 'block';
    data.innerHTML = prop + ' ' + obj[prop];
    space.appendChild(data);
    console.log(prop + ' ' + obj[prop]);
    var newObj = obj[prop];
    if (typeof newObj == 'object') {
      showCarpet(newObj);
      
    }
  }
}