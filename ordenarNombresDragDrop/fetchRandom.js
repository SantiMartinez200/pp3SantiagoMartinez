var arrayNombres = [];
var arrayOrdenado = [];
var values = [];
var add = "";
var arrayToCompare = [];
var inputsRestantes = [];
var arrayDrop = ["", "", "", "", "", "", "", "", "", ""];
async function getUsers() {
  await fetch("https://randomuser.me/api/?nat=gb&results=10")
    .then((res) => res.json())
    .then((data) => {
      const datos = data.results;
      for (let i = 0; i < datos.length; i++) {
        let add = arrayNombres.push(datos[i].name.first);
      }
      let drag = document.getElementById("drag");
      let divDraggable = document.querySelector(".draggable");
      for (let i = 1; i < 11; i++) {
        let readInput = document.getElementById("i" + i);
        readInput.setAttribute("value", arrayNombres[i - 1]);
        readInput.classList = "inputeable form-control border border-primary";
        readInput.readOnly = "readonly";
        drag.appendChild(divDraggable);
        divDraggable.appendChild(readInput);
      }
    });
  arrayOrdenado = arrayNombres.sort(function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
  //console.log(arrayOrdenado);
}
getUsers();

function allowdrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  let j = 0;
  if (arrayDrop[parseInt(ev.target.id)] == "") {
    let elem = document.getElementById(ev.target.id);
    elem.classList = "dropeable rounded";
    var data = ev.dataTransfer.getData("text");
    arrayDrop[parseInt(ev.target.id)] = data;
    ev.target.appendChild(document.getElementById(data));
  }
}

function compare() {
  var pushh = document.querySelectorAll(
    ".container .droping .dropeable .inputeable"
  );
  for (let i = 0; i < 10; i++) {
    if (typeof pushh[i] == "undefined") {
      add = values.push("");
    } else {
      add = values.push(pushh[i].value);
    }
  }
  let arrayToCompare = arrayNombres.sort(function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
  var cont = 0;
  //console.log(values);
  for (let i = 0; i < 10; i++) {
    if (arrayToCompare[i] == values[i]) {
      cont = cont + 1;
      //console.log(cont);
    }
  }

  var aviso = document.getElementById("aviso");
  var res = document.createElement("h3");
  if (cont == 10) {
    res.classList = "resG";
    res.innerHTML =
      "Moviste todas las respuestas correctamente, <pre class='text-success'>Felicidades!</pre><br>";
    aviso.appendChild(res);
  } else {
    res.classList = "resW";
    res.innerHTML =
      "No has movido correctamente, <pre class='text-danger'>Intentalo denuevo :(</pre>";
    aviso.appendChild(res);
    let showResults = document.createElement("button");
    showResults.onclick = showResultsFunction;
    showResults.classList = "btn btn-primary m-1";
    showResults.textContent = "Resultados";
    res.appendChild(showResults);
  }
  //console.log(values);
  var restart = document.createElement("button");
  restart.onclick = restartDoc;
  restart.textContent = "Reiniciar";
  restart.classList = "btn btn-primary";
  res.appendChild(restart);
}

function restartDoc() {
  location.reload();
}

function showResultsFunction() {
  let aviso = document.getElementById("aviso");
  aviso.remove();
  let results = document.createElement("div");
  results.classList = "resA";
  for (let i = 0; i < arrayOrdenado.length; i++) {
    let createInputResult = document.createElement("input");
    createInputResult.classList = "form-control mt-2 inputRes";
    createInputResult.setAttribute("value", arrayOrdenado[i]);
    createInputResult.readOnly = "readonly";
    results.appendChild(createInputResult);
  }
  let resultsDiv = document.querySelector(".results");
  let button = document.createElement("button");
  button.classList = "btn btn-primary";
  button.textContent = "Reiniciar";
  button.onclick = restartDoc;
  resultsDiv.appendChild(results);
  resultsDiv.appendChild(button);
}
