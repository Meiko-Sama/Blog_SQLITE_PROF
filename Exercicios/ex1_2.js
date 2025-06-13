// Para usar o prompt no nodejs é preciso instalar essa lib 'prompt-sync'

let prompt = require("prompt-sync");
prompt = prompt();

const n1 = parseFloat(prompt("Digite o primeiro número:"));
console.log(n1);

const n2 = parseFloat(prompt("Numero dois:"));
console.log("A soma de n1+n2 é : ", n1 + n2);
