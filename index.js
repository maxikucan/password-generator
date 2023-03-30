const passwordInput = document.getElementById('password');
const pwLength = document.getElementById("length");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");

const options = Object.freeze({
    numbers: "0123456789",
    letters: "abcdefghijklmnopqrstuvwxyz",
    special: "*¡!*+¿?|#$@-^<>¬%&="
})

const config = {
    lowerCase: true,
    upperCase: false,
    numbers: false,
    special: false
}

function generatePassword(length) {
    let charset = "";
    const finalPassword = [];

    if (!config.upperCase && !config.lowerCase && !config.numbers && !config.special) {
        passwordInput.value = 'No allowed characters defined.'
        console.error('No allowed characters defined.');
        return;
    }

    // Cargo un string con los caracteres requeridos.
    for (let i = 0; i < length; i++) {
        if (config.lowerCase) {
            charset += options.letters.charAt(Math.random() * options.letters.length)
        }

        if (config.upperCase){
            charset += options.letters.charAt(Math.random() * options.letters.length).toUpperCase();
        }

        if (config.numbers) {
            charset += options.numbers.charAt(Math.random() * options.numbers.length)
        }

        if (config.special) {
            charset += options.special.charAt(Math.random() * options.special.length)
        }

    }

    // Paso ese string a un array con el largo que pide el usuario, ordenando en un caracter requerido por cada iteración.
    for (let i = 0; i < length; i++) {
        finalPassword.push(charset[i]);

    }

    // Ordeno el array de forma desordenada.
    finalPassword.sort(() => {
        return 0.5 - Math.random();
    })

    // Imprimo el array final como string.
    passwordInput.value = finalPassword.join("");

}

// Events

generateButton.addEventListener('click', () => generatePassword(pwLength.value))

copyButton.addEventListener('click', () => {
    if (passwordInput.value.length > 0) {

        navigator.clipboard.writeText(passwordInput.value);
        alert("Password copied");
    } else {
        alert("Nothing to copy (¬_¬ )");
    }
})

document.addEventListener('click', (e) => {
    if(e.target.dataset.ref === "control"){
        config[e.target.id] = e.target.checked;
    }

})