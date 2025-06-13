const titulo = document.getElementById("titulo");
const nome = document.getElementById("inNome");
console.log(titulo);
console.log(titulo.textContent);
console.log(nome.textContent);
console.log(nome.value);

const teste = document.getElementsByClassName("paragrafo")

console.log(teste)

for(let i=0; i<teste.length; i++) {
    console.log(i+1,teste[i].textContent);
}

console.log("")

const paragrafos = document.getElementsByTagName("body")
for(let i=0; i<paragrafos.length; i++) {
    console.log(i+1,paragrafos[i].textContent);
}



function getEmail() {
    const email = document.getElementById("inEmail")
    console.log(email.value);
}