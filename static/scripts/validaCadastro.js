console.log("JS CONECTADO!");

const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const celular = document.getElementById("celular");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const msgErrorElements = document.getElementsByClassName("msgError");

/* ------ FUNÇÃO PARA RENDERIZAR AS DIFERENTES MENSAGENS DE ERRO! ------ */
const createDisplayMsgError = (mensagem) => {
  if (msgErrorElements.length > 0) {
    // Boa prática para verificar se o elemento
    msgErrorElements[0].textContent = mensagem;
    msgErrorElements[0].style.display = mensagem ? "block" : "none"; // Mostrar/ocultar
  }
};
/* --------------------------------------------------------------------- */

/* ---------------- FUNÇÃO PARA VERIFICAR O NOME ----------------------- */
const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s'-]+$/; // Permitindo apóstrofos e hífens
  return nomeRegex.test(nome.value.trim()); // .trim() para remover espaços
};
/* --------------------------------------------------------------------- */

/* ---------- FUNÇÃO PARA VERIFICAR O EMAIL --------------------- */
const checkEmail = (email) => {
  const partesEmail = email.split("@");

  if (
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "gmail.com") ||
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "outlook.com") ||
    (partesEmail.length === 2 && partesEmail[1].toLowerCase() === "hotmail.com")
  ) {
    return true;
  } else {
    return false;
  }
};
/* --------------------------------------------------------------------- */

/* ---------- FUNÇÃO PARA VERIFICAR IGUALDADE DAS SENHAS --------------- */
function checkPasswordMatch() {
  return senha.value === confirmarSenha.value ? true : false;
}
/* --------------------------------------------------------------------- */

/* ----------- FUNÇÃO PARA INSERIR MASCARA NO TELEFONE ----------------- */

function maskPhoneNumber(event) {
  let celular = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(celular)) {
    createDisplayMsgError("O celular deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }

  celular = celular.replace(/\D/g, ""); // Remove os caracteres não numéricos

  if (celular.length > 11) {
    celular = celular.substring(0, 11);
  }

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)}`;
  } else if (celular.length > 0) {
    celular = `(${celular}`;
  }

  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = celular;
}
/* --------------------------------------------------------------------- */

/* ------------- FUNÇÃO PARA VERIFICAR FORÇA DA SENHA ------------------ */
function checkPasswordStrength(senha) {
  if (!/[a-z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/[\W_]/.test(senha)) {
    return "A senha deve ter pelo menos um caractere especial!";
  }
  if (!/\d/.test(senha)) {
    return "A senha deve ter pelo menos um número!";
  }
  if (senha.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}
/* --------------------------------------------------------------------- */

/* ------------- FUNÇÃO PARA VERIFICAR E ENVIAR DADOS ------------------ */
async function fetchDatas(event) {
  // Tornar a função async para usar await
  event.preventDefault(); // Ele trava até a função terminar
  createDisplayMsgError(""); // Limpa mensagem de erros anteriores

  if (!checkNome) {
    // Aqui, agora, vai chamar a função
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    nome.focus(); // Se aconteceu erro ele redireciona o foco para esse campo, forçando o usuário até acertar o campo aqui.
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayMsgError(
      // Correção de mensagem apropriada
      "O e-mail digitado não é valido ou não é de um domínio permitido"
    );
    email.focus();
    return;
  }

  const senhaError = checkPasswordStrength(senha.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    senha.focus();
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    confirmarSenha.focus();
    return;
  }

  // Validação do celular (opcional, já que a máscara tenta corrigir)
  const celularLimpo = celular.value.replace(/\D/g, "");
  if (celular.value && (celularLimpo.length < 10 || celularLimpo.length > 11)) {
    createDisplayMsgError("O número de celular está invalido");
    celular.focus();
    return;
  }

  const formData = {
    // `username`: Representa o nome de usuário inserido pelo usuário.
    // `.trim()` é usado para remover quaisquer espaços em branco extras
    // do início ou do fim da string do nome de usuário.
    username: nome.value.trim(),

    // `email`: Armazena o endereço de e-mail fornecido.
    // `.trim()`  tembém é aplicado aqui é para limpar espaços em branco
    // desnecessários, garantido que o e-mail seja processado corretamente.
    email: email.value.trim(),

    // `password`: Contém a senha digitada pelo usuário
    // IMPORTANTE: A senha não deve ser "trimmed" (não se deve usar .trim())
    // porque espaços no início ou no fim podem ser intencionais e parte da senha escolhida.
    password: senha.value,

    // `celular`: Guarda o número de celular do usuário
    // `celularLimpo` é uma variável que (presumivelmente) já contém o número
    // de celular formatado apenas com dígitos, sem máscaras ou caracteres especiais.
    // É importante enviar apenas os números para facilitar o processamento no backend.
    celular: celularLimpo,

    // `cpf`: Contém o número do Cadastro de Pessoa Físicas (CPF)
    // `.replace(/\D/g, "")` é usado para remover todos os caracteres
    // que não são dígitos (como pontos e hífens, comuns em máscaras de CPF),
    // garantindo que apenas os números do CPF sejam envios.
    cpf: cpf.value.replace(/\D/g, ""),

    // `rg`: Armazena o número do Registro Geral (RG) ou documento de identidade.
    // Similar ao CPF, `.replace(/\D/g, "")` remove quaisquer caracteres
    // não numéricos, assegurando que apenas os dígitos do RG sejam transmitidos.
    rg: rg.value.replace(/\D/g, ""),
  };

  console.log("Dados a serem enviados: ", JSON.stringify(formData, null, 2));

  // -------------- INÍCIO DA LÓGICA DE ENVIO ----------------------

  try {
    const response = await fetch("/cadastro", {
      method: 'POST', // Método HTTP
      headers: {
        "Content-Type": "application/json", // Indicando que estamo enviando o JSON
        // 'Accept': 'application/jason' // Opicional, indica que esperamos o JSON
      },
      body: JSON.stringify(formData), // Converte o objeto JavaScript para uma string JSON
    });

    if (response.ok) {
      // Verificar a resposta do servidor foi bem sucedida (status 2xx)
      const result = await response.json(); // Tenta parsear a resposta do servidor com JSON
      console.log("Sucesso: ", result);
      formulario.reset(); // Limpa o fromulário após sucesso

      // createDisplayMsgError('Cadastro realizado com sucesso! ' + (result.message || ""))

      alert("Cadastro realizado com sucesso!" + (result.message || ""));
      window.location.href = "/login";

      // Redirecionar ou mostrar mensagem de sucesso mais elaborada
    } else {
      // O servidor respondeu com erro (status 4xx ou 5xx)

      const errorData = await response.json().catch(() => ({
        message: "Erro ao processar a resposta do servidor.",
      })); // Tenta pegar a mensagem de erro do servidor
      console.error("Erro de servidor: ", response.status, errorData);
      createDisplayMsgError(
        `Erro, ${errorData.message || response.statusText}`
      );
    }
  } catch (error) {
    // Erro de rede ou algo que impediu a requisição de ser completa
    console.error("Erro na requisição", error);
    createDisplayMsgError("Erro de conexão. Por favor, tente novamente.");
  }
}
// ----- FIM DA LÓGICA DE ENVIO ----------

formulario.addEventListener("submit", fetchDatas);

nome.addEventListener("input", () => {
  if (nome.value && !checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
  } else {
    createDisplayMsgError("");
  }
});

email.addEventListener("input", () => {
  if (email.value && !checkEmail(email.value)) {
    createDisplayMsgError("O e-mail digitado não é valido!");
  } else {
    createDisplayMsgError("");
  }
});

senha.addEventListener("input", () => {
  if (senha.value && checkPasswordStrength(senha.value)) {
    createDisplayMsgError(checkPasswordStrength(senha.value));
  } else {
    createDisplayMsgError("");
  }
});

function checkPasswordStrength(senha) {
  if (!/[a-z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/[\W_]/.test(senha)) {
    return "A senha deve ter pelo menos um caractere especial!";
  }
  if (!/\d/.test(senha)) {
    return "A senha deve ter pelo menos um número!";
  }
  if (senha.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}
