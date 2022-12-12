"use strict";

const passwordSlider = document.querySelector(".password-length input");
const password = document.querySelector(".password-length .password");

const passwordInput = document.querySelector(".input-box input");

const options = document.querySelectorAll(".options input")

const generateButtton = document.querySelector(".generate-password");
const copyButton = document.querySelector(".input-box span")

const passwordIndicator = document.querySelector(".password-indicator");

const characters = {
    lowercase: "abcdefghiljkmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    symbols: "!@#$%^&*()~{}[]|'<>,.?",
    numbers: "0123456789"
}

const updatePasswordIndicator = () => {
    //if length is less than 8, then weak or check if less than 16 if no then strong
    passwordIndicator.id = passwordSlider.value <= 8 ? "weak" : passwordSlider.value <= 16 ? "medium" : "strong";
}

const updateValue = () => {
    // console.log(passwordSlider.value);
    password.innerHTML = passwordSlider.value;
    generatePassword();
    updatePasswordIndicator();
}

// String.prototype.contains = function (str) {
//     return this.indexOf(str) != -1;
// };

const generatePassword = () => {
    let staticPassword = "";
    let passwordLength = passwordSlider.value;
    let excludeDuplicates = false;
    let randomPassword = "";

    options.forEach((item) => {
        if (item.checked) {
            // console.log(item);   
            if (item.id != "exc-duplicate" && item.id != "spaces") {
                staticPassword += characters[item.id];
            } else if (item.id === "spaces") {
                staticPassword += ` ${staticPassword}   `
            } else {
                excludeDuplicates = true;
            }
        }

    });

    for (let i = 0; i < passwordLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicates) {
            // !randomPassword.contains(randomChar) || randomChar === " " ? randomPassword += randomChar : i--;
            !randomPassword.includes(randomChar) || randomChar === " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }


    }

    passwordInput.value = randomPassword;

    console.log(randomPassword);

    // console.log(staticPassword);
}

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyButton.innerText = "check";
    console.log("Copied Password");
    setTimeout(() => {
        copyButton.innerText = "copy_all"
    }, 2500);
}

updateValue();

passwordSlider.addEventListener("input", updateValue);
generateButtton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copyPassword);

