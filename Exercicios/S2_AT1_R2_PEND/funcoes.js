// Exercício 1
// 1. Tabuada de um número
//     - Crie uma função tabuada(numero) que recebe um número e exibe a tabuada de 1 a 10 no console.
//     - Exemplo de uso: tabuada(5);
function tabuada(numero) {
  let resultado = [];
  for (let i = 1; i < 11; i++) {
    resultado.push(i * numero);
  }
  return resultado;
}

// 2. Soma dos N primeiros números
//      - Crie uma função somaAteN(n) que recebe um número inteiro n e retorna a soma de todos os números de 1 até n.
//      - Exemplo de uso: somaAteN(5); // Retorna 15 (1+2+3+4+5)

function somaAteN(numero) {
  let resultado = 0;
  for (let i = 1; i <= numero; i++) {
    resultado += i;
  }
  return resultado;
}

// 3. Verificar número primo
//      - Crie uma função ehPrimo(numero) que recebe um número e verifica se ele é primo. Retorne true se for primo e false caso contrário.
//      - Exemplo de uso: ehPrimo(7); // Retorna true
function isPrime(numero) {
  if (numero === 1 || numero === 2) {
    return true; // Se for 1 ou 2 retorna TRUE
  } else if (numero % 2) {
    for (let i = 3; i < numero; i += 2) {
      if (!(numero % i)) return false;
    }
    return true;
  } else {
    return false; // Se o número for par retorna FALSE
  }
}

// 4. Contagem regressiva
//      - Crie uma função contagemRegressiva(n) que recebe um número n e exibe a contagem regressiva até 0 no console.
//      - Exemplo de uso: contagemRegressiva(5); // Exibe 5, 4, 3, 2, 1, 0
function contagemRegressiva(numero) {
  let res = [];
  for (let i = numero; i >= 0; i--) {
    res.push(i);
  }
  return res;
}

function contagemRegressivaJSON(numero) {
  return { parametro: numero, resultado: contagemRegressiva(numero) };
}

//   5 Número aleatório entre 1 e 10
//   - Crie uma função adivinharNumero() que gere um número aleatório de 1 a 10 e continue pedindo ao usuário para adivinhar até acertar.
//   - Exemplo de uso: adivinharNumero(); // O usuário digita até acertar
function adivinharNumero() {
  const sorteado = Math.floor(Math.random() * 9 + 1);
  return sorteado;
}

function revString(texto) {
  let res = "";
  //console.log(texto.length);
  for (let i = texto.length - 1; i >= 0; i--) {
    //console.log(texto[i])
    res += texto[i];
  }
  return res;
}

function revStringJSON(palavra) {
  return { parametro: palavra, resultado: revString(palavra) };
}

function addSpaces(palavra, caracter = " ") {
  let res = "";
  for (let i = 0; i < palavra.length - 1; i++) {
    res += palavra[i] + caracter;
  }
  return res + palavra[palavra.length - 1];
}

function addSpacesJSON(palavra) {
  return { parametro: palavra, resultado: addSpaces(palavra) };
}
