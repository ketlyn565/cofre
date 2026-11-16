
let secretNumber;
let attempts = 0;
const maxAttempts = 7;
let gameOver = false;

// ELEMENTOS DO HTML

const guessInput = document.getElementById("guess");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const remainingDisplay = document.getElementById("remaining");
const progress = document.getElementById("progress");
const warning = document.getElementById("warning");
const vault = document.getElementById("vault");
const vaultStatus = document.getElementById("vaultStatus");
const overlay = document.getElementById("overlay");
const tryButton = document.getElementById("tryButton");

// SORTEAR UM NÚMERO ENTRE 1 E 50

function generateSecretNumber() {
    return Math.floor(Math.random() * 50) + 1;
}

// ATUALIZAR CONTADOR

function updateAttempts() {

    const remaining = maxAttempts - attempts;

    attemptsDisplay.textContent = attempts + " / " + maxAttempts;

    remainingDisplay.textContent = remaining;

    progress.style.width =
        (remaining / maxAttempts * 100) + "%";

    if (remaining <= 2) {
        progress.style.background = "#ff6b4a";
    } else {
        progress.style.background = "#55cb78";
    }
}

// TENTAR DESCOBRIR A SENHA

function checkGuess() {

    if (gameOver) return;

    const guess = Number(guessInput.value);

    // VALIDAR CAMPO VAZIO

    if (guessInput.value.trim() === "") {
        message.textContent = "Digite uma senha primeiro!";
        message.className = "message error";
        return;
    }

    // VALIDAR NÚMEROS

    if (!Number.isInteger(guess) || guess < 1 || guess > 50) {

        message.textContent =
            "Digite um número inteiro entre 1 e 50!";

        message.className = "message error";

        return;
    }

    // CONTABILIZAR TENTATIVA

    attempts++;

    const remaining = maxAttempts - attempts;

    updateAttempts();

    // VERIFICAR SE ACERTOU

    if (guess === secretNumber) {

        message.textContent = "Cofre desbloqueado!";

        message.className = "message success";

        unlockVault();

        return;
    }

    // DICAS PARA O JOGADOR

    if (guess < secretNumber) {

        message.textContent = "A senha é maior! ↑";

        message.className = "message";

    } else {

        message.textContent = "A senha é menor! ↓";

        message.className = "message";
    }

    // ALERTA QUANDO RESTAREM DUAS TENTATIVAS

    if (remaining === 2) {

        warning.textContent =
            "⚠ ATENÇÃO! RESTAM APENAS 2 TENTATIVAS!";

        warning.classList.add("danger");

    } else if (remaining > 2) {

        warning.textContent = "";

    }

    // VERIFICAR SE ACABARAM AS TENTATIVAS

    if (attempts >= maxAttempts) {

        loseGame();

        return;
    }

    // LIMPAR CAMPO

    guessInput.value = "";
    guessInput.focus();
}

// DESBLOQUEAR O COFRE

function unlockVault() {

    gameOver = true;

    vault.classList.add("unlocked");

    vaultStatus.innerHTML =
        '<span class="status-dot"></span> COFRE DESBLOQUEADO';

    vaultStatus.style.color = "#75f59b";

    document.getElementById("finalAttempts").textContent =
        attempts;

    tryButton.disabled = true;

    guessInput.disabled = true;

    // EXIBIR TELA DE VITÓRIA

    setTimeout(() => {

        overlay.classList.add("active");

    }, 800);
}

// QUANDO O JOGADOR PERDER

function loseGame() {

    gameOver = true;

    message.textContent =
        "Você esgotou suas tentativas! A senha era " +
        secretNumber + ".";

    message.className = "message error";

    warning.textContent = "✖ ACESSO NEGADO!";

    warning.classList.add("danger");

    tryButton.disabled = true;

    guessInput.disabled = true;
}

// REINICIAR O JOGO

function restartGame() {

    secretNumber = generateSecretNumber();

    attempts = 0;

    gameOver = false;

    guessInput.value = "";

    guessInput.disabled = false;

    tryButton.disabled = false;

    message.textContent =
        "A floresta guarda um segredo...";

    message.className = "message";

    warning.textContent = "";

    warning.classList.remove("danger");

    vault.classList.remove("unlocked");

    vaultStatus.innerHTML =
        '<span class="status-dot"></span> COFRE BLOQUEADO';

    vaultStatus.style.color = "#d5a24d";

    overlay.classList.remove("active");

    updateAttempts();

    guessInput.focus();

}

// PERMITIR JOGAR PRESSIONANDO ENTER

guessInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkGuess();
    }

});

// INICIAR O JOGO AUTOMATICAMENTE

restartGame();
