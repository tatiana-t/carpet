// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var carpet;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    carpet = JSON.parse(this.responseText);
    var search = carpet[1];
    console.log(search);
    space.innerHTML = search.Collection;
  }
};
console.log(carpet);
xhr.open('GET', 'carpets.json', true);
xhr.send();

var space = document.getElementById('info');
