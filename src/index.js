//ELEMETOS HTML Y EVENTOS
//Formulario
const date_input = document.getElementById("date_input");
const team_input = document.getElementById("team_input");
const form = document.getElementById("form");
//Selector
const selecter = document.getElementById("selecter");
//Contenedores Div
const container1 = document.getElementById("container1");
const container2 = document.getElementById("container2");
const resultsContainer = document.getElementById(
  "container2__results-container"
);
const x = "";
//Botón
const btn = document.getElementById("btn");
//Eventos
form.addEventListener("keyup", validate);
btn.addEventListener("mouseup", filterResults);

let file; //Aquí se guarda el archivo local
//Leyendo archivo liners.txt local
async function reader() {
  try {
    const res = await fetch("../resultsFootball.csv", {
      method: "get",
      headers: {
        "content-type": "text/csv;charset=UTF-8",
      },
    });
    file = await res.text();
  } catch (error) {
    console.error(error);
  }
}
reader();

//FUNCIONES
//Función validadora de email por medio del inpunt
function validate() {
  //Se crea un objeto FormData para obtener los valores de los inputs
  const formData = new FormData(form);
  //Datos a validar
  const validateName = formData.get("name");
  const validateDate = formData.get("date");
  //Validar si el nombre y la fecha cumplen con un formato dado
  if (
    validateName.match(/^[á-úa-z]+$/i) &&
    validateDate.match(/^[1-2][\d]{3,3}$/)
  ) {
    btn.disabled = false;
  } else {
    if (!btn.disabled) {
      btn.disabled = true;
    }
  }
}

//Función que muestra los resultados
function filterResults() {
  //Se crea un objeto FormData para obtener los valores de los inputs
  const formData = new FormData(form);
  //Datos a validar
  const validateName = formData.get("name");
  const validateDate = formData.get("date");
  const validateMatch = formData.get("match");

  if (validateMatch === "visitor") {
    const re = new RegExp(
      validateDate +
        "-\\d\\d-\\d\\d,(.+)," +
        validateName +
        ",(\\d+),(\\d+),.*",
      "gi"
    );
    showResults(re);
  }
  if (validateMatch === "local") {
    const re = new RegExp(
      validateDate + "-\\d\\d-\\d\\d," + validateName + "(.+),(\\d+),(\\d+),.*",
      "gi"
    );
    showResults(re);
  }
}

//Esta función se encargará de agregar las etiquetas "p" con cada match al contendor de results
function showResults(re) {
  const fragment = document.createDocumentFragment();
  console.log(fragment);
  resultsContainer.innerHTML = "";
  if (file.match(re)) {
    file.match(re).forEach((item) => {
      const p = document.createElement("p");
      p.classList.add("result");
      let chain = item.split(",");
      chain.pop();
      console.log(chain);
      const text = chain.join(", ");
      p.textContent = text;
      fragment.appendChild(p);
    });
    resultsContainer.appendChild(fragment);
  } else {
    resultsContainer.textContent = "Results not found";
  }
}
