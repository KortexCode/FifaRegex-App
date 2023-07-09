//Elementos html y eventos
const email_input = document.getElementById("email_input");
const container1 = document.getElementById("container1");
const container2 = document.getElementById("container2");
const p = document.getElementById("message");
email_input.addEventListener("keyup", validate);

//Leyendo archivo liners.txt local
async function reader() {
  const res = await fetch("../../liners.txt");
  const data = await res.text();
  console.log(data);
  const arrayList = data.split("\n");
  arrayList.forEach((item) => {
    if (item.match(/^[^@_]+@[\w\.]{2,}\.[\w]{2,5}$/i)) {
      console.log("first");
      const email = document.createElement("p");
      email.textContent = item;
      container2.appendChild(email);
    }
  });
}

reader();

//Función validadora de email por medio del inpunt
function validate() {
  if (email_input.value.match(/^[^@_]+@[\w\.]{2,}\.[\w]{2,5}$/i)) {
    const btn = document.getElementById("btn");
    btn.disabled = false;
    p.style.display = "block";
  } else {
    if (!btn.disabled) {
      btn.disabled = true;
      p.style.display = "none";
    }
    return;
  }
}
