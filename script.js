const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener("click", () => {
  const password = resultEl.innerText;
  if (!password) {
    return;
  }
  navigator.clipboard.writeText(password);
  alert("password copied to clipboard");
});

generateEl.addEventListener("click", function () {
  const lengthFromUi = +lengthEl.value;
  const upperFromUi = uppercaseEl.checked;
  const lowerFromUi = lowercaseEl.checked;
  const numberFromUi = numbersEl.checked;
  const symbolFromUi = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    lowerFromUi,
    upperFromUi,
    numberFromUi,
    symbolFromUi,
    lengthFromUi
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let newPassword = "";
  const countSelection = lower + upper + number + symbol;
  const arr = [{ lower }, { upper }, { number }, { symbol }].filter(onlyTrue);
  function onlyTrue(item) {
    return Object.values(item)[0] === true;
  }

  if (countSelection === 0) {
    return "";
  } else {
    for (let i = 0; i < length; i = i + countSelection) {
      arr.forEach(function (item) {
        const funcName = Object.keys(item)[0];
        newPassword = newPassword + randomFunc[funcName]();
      });
    }
  }

  const finalPassword = newPassword.slice(0, length);
  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "~!@#$%^&*()_+?<>";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
