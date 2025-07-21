// Gera um número aleatório entre 1 e 200,usa se assim por causa do Math.round que arrendonda os números de forma correta
let numeroAleatorio = Math.round(Math.random() * 199) + 1;

// Pega os elementos a partir de suas classes 
const palpites = document.querySelector(".palpites"); // Parágrafo onde os palpites anteriores são mostrados
const ultimoResultado = document.querySelector(".ultimoResultado"); // Mostra se acertou ou errou
const baixoOuAlto = document.querySelector(".baixoOuAlto"); // Dá dicas: "mais alto" ou "mais baixo"
const enviar = document.querySelector(".enviarPalpite"); // Botão de enviar palpite
const campoPalpite = document.querySelector(".campoPalpite"); // Onde se digita o número

// Contador de tentativas do jogador que vai aumentando com o tempo 
let contadorPalpite = 1;

// botão de reiniciar o jogo
let resetarBotao;

// Adiciona o evento de clique ao botão "Enviar", chamando a função checarPalpite
enviar.addEventListener("click", checarPalpite);

// Função que verifica o palpite do jogador
function checarPalpite() {
    const palpiteUsuario = Number(campoPalpite.value); // Pega o que é digitado e converte para número

    if (contadorPalpite === 1) {
        //Cria um texto a partir do primeiro palpite
        palpites.textContent = "Palpites anteriores: ";
    }

    // Adiciona o palpite atual à lista
    palpites.textContent += palpiteUsuario + " ";

    if (palpiteUsuario === numeroAleatorio) {
        // Se acertou o número:
        ultimoResultado.textContent = "Parabéns! Você acertou!";
        ultimoResultado.style.backgroundColor = "green"; // fundo verde para indicar sucesso
        baixoOuAlto.textContent = ""; // limpa dica
        setFimDeJogo(); // chama a função que finaliza o jogo
    } else if (contadorPalpite === 15) {
        // Se chegou à 15ª tentativa sem acertar:
        ultimoResultado.textContent = "Fim de jogo! acabaram seu número de tentativas!";
        baixoOuAlto.textContent = ""; // limpa dica
        setFimDeJogo(); // finaliza o jogo
    } else {
        // Se ainda tem tentativas e errou:
        ultimoResultado.textContent = "Não é o número certo";
        ultimoResultado.style.backgroundColor = "red"; // fundo vermelho para erro

        // Dá dica se o número é maior ou menor que o palpite
        if (palpiteUsuario < numeroAleatorio) {
            baixoOuAlto.textContent = "Você está perto, tente um número mais alto!";
        } else if (palpiteUsuario > numeroAleatorio) {
            baixoOuAlto.textContent = "Você está perto, tente um número mais baixo!";
        }
    }

    // Conta o número de tentativas,aumentando em 1 
    contadorPalpite++;

    // Limpa o campo e foca o cursor de volta nele
    campoPalpite.value = "";
    campoPalpite.focus();


// Quando o jogo termina (por vitória ou por 15 tentativas) 
function setFimDeJogo() {
    campoPalpite.disabled = true; // desativa o campo de entrada,assim não é possível colocar números
    enviar.disabled = true; // desativa o botão de envio,assim não é possível enviar mais nada

    // Cria botão de reinício do jogo
    resetarBotao = document.createElement("button");
    resetarBotao.textContent = "Começar novo jogo";
    document.body.appendChild(resetarBotao); // adiciona o botão ao corpo da página

    // Quando o botão for clicado, chama a função de reset
    resetarBotao.addEventListener("click", resetarJogo);
}

// Função que reinicia o jogo completamente
function resetarJogo() {
    contadorPalpite = 1; // reseta o número de tentativas

    // Seleciona todos os parágrafos dentro da div .paragrafos e limpa o conteúdo
    const resetarParagrafos = document.querySelectorAll(".paragrafos p");
    for (const paragrafo of resetarParagrafos) {
        paragrafo.textContent = "";
        //seleciona um parágrafo específico a partir da lista 
    }

    // Remove o botão de reinício da tela
    resetarBotao.parentNode.removeChild(resetarBotao);

    // Reativa o campo de entrada e o botão de enviar
    campoPalpite.disabled = false;
    enviar.disabled = false;

    // Limpa o campo de palpite e foca nele
    campoPalpite.value = "";
    campoPalpite.focus();

    // Restaura a cor de fundo do resultado para branco
    ultimoResultado.style.backgroundColor = "white";

    // Gera um novo número aleatório para a próxima rodada
    numeroAleatorio = Math.round(Math.random() * 199) + 1;
}
}