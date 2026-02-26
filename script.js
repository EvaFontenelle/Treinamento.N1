/* 
Função reutilizável.
Recebe um texto (v) e remove tudo que NÃO for número.
\D  → qualquer coisa que não seja dígito
g   → global (pega todos)
*/
const onlyNumbers = v => v.replace(/\D/g, '');


/* =========================
   CPF
   ========================= */

inpCPF.oninput = () => {

  /*
  cpf.value → valor atual digitado
  onlyNumbers() → remove pontos, letras, traços etc.
  slice(0,11) → limita a 11 números (tamanho real do CPF)
  */
  let v = onlyNumbers(inpCPF.value).slice(0,11);

  /*
  REGEX explicação:
  (\d{3}) → pega 3 números
  (\d{3}) → pega mais 3
  (\d{3}) → pega mais 3
  (\d{0,2}) → pega até 2 números finais (pode estar incompleto)

  (_,a,b,c,d) →
  a = primeiros 3 números
  b = próximos 3
  c = próximos 3
  d = últimos 2

  Se existir d (últimos números),
  monta no formato 000.000.000-00
  Senão, monta parcial enquanto a pessoa digita
  */
  inpCPF.value = v.replace(
    /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
    (_,a,b,c,d) => d 
      ? `${a}.${b}.${c}-${d}` 
      : `${a}.${b}.${c}`
  );
};


/* =========================
   CEP
   ========================= */

inpAdress.oninput = () => {

  /*
  Limita a 8 números (tamanho real do CEP)
  */
  let v = onlyNumbers(inpAdress.value).slice(0,8);

  /*
  (\d{5}) → primeiros 5 números
  (\d{0,3}) → até 3 números finais

  Se existir a segunda parte,
  formata como 00000-000
  */
  inpAdress.value = v.replace(
    /(\d{5})(\d{0,3})/,
    (_,a,b) => b 
      ? `${a}-${b}` 
      : a
  );
};

const botao = document.getElementById("btnEntrar");

botao.addEventListener("click", function () {

    var cpf = document.getElementById("inpCPF").value;
    var senha = document.getElementById("inpSenha").value;
    var cep = document.getElementById("inpAdress").value;
    var mensagem = document.getElementById("msg");

    var cpfCorreto = "123.456.789-10";
    var senhaCorreta = "12345";
    var cepCorreto = "12345-678";

    if (cpf === "" || senha === "" || cep === "") {

        mensagem.innerText = "Preencha todos os campos!";
        mensagem.style.color = "white";

    } else if (cpf === cpfCorreto && senha === senhaCorreta && cep === cepCorreto) {

        mensagem.innerText = "Login realizado com sucesso! Redirecionando...";
        mensagem.style.color = "blue";

        botao.disabled = true;

        setTimeout(function () {
            window.location.href = "vendas.html";
        }, 5000);

    } else {

        mensagem.innerText = "Dados incorretos!";
        mensagem.style.color = "purple";

    }

});