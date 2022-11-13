"use strict";

let randomNumber = Math.floor(Math.random() * 101);

let userInput;

let count = 1;

const message = document.getElementById("main-content__message");

const refreshBtn = document.getElementById("refresh");

const submitBtn = document.getElementById("btn-input");

const usernInlineTitle = document.getElementById(
  "main-content__user-section-title"
);

const pcInlineTitle = document.getElementById("main-content__pc-section-title");

const userGuesses = document.getElementById("main-content__user-guesses");

const guessesCounter = document.getElementById("guesses-counter");

const pcGuesses = document.getElementById("main-content__pc-guesses");

let pcInput;

let min;

let max;

let previousGuesses = [];

let userInputSaved;

let newSpan;

const userSection = document.getElementById("user-section");

const pcSection = document.getElementById("pc-section");

let userDataWrongAnswer = {
  initialClass: "main-content__guesses_wrong",
  spanId: "user-answers",
  spanClass: "main-content__guesses_user-wrong",
  title: usernInlineTitle,
};

let userDataRightAnswer = {
  initialClass: "main-content__guesses",
  spanId: "user-answers",
  spanClass: "main-content__guesses_user-right",
  title: usernInlineTitle,
};

let pcDataWrongAnswer = {
  initialClass: "main-content__guesses_wrong",
  spanId: "pc-answers",
  spanClass: "main-content__guesses_pc-wrong",
  title: pcInlineTitle,
};

let pcDataRightAnswer = {
  initialClass: "main-content__guesses",
  spanId: "pc-answers",
  spanClass: "main-content__guesses_pc-right",
  title: pcInlineTitle,
};

// function that disables input field and submit button
function disabledInput() {
  submitBtn.setAttribute("disabled", "true");
  refreshBtn.style.display = "block";
  document.getElementById("input").setAttribute("disabled", "true");
}

//function that shows message to the user after submit button was hit
function sendMessage(messageForUser, setClassName) {
  message.innerText = messageForUser;
  message.className = "";
  message.classList.add(setClassName);
}
// pop-up window (alert)
function alert(message) {
  const alert = document.getElementById("alert");
  alert.style.display = "block";
  alert.innerText = message;
  document.getElementById("main-content").style.filter = "blur(5px)";
  window.addEventListener("click", function (e) {
    if (e.target === this.document.getElementById("alert")) {
      this.document.getElementById("alert").style.display = "none";
      this.document.getElementById("main-content").style.filter = "blur(0px)";
    } else if (e.target === this.document.body) {
      this.document.getElementById("alert").style.display = "none";
      this.document.getElementById("main-content").style.filter = "blur(0px)";
    }
  });
}
// add span tag to wrap entries when data is submitted
function addSpanForGuesses(data, inputtedBy) {
  if (document.getElementById(data.spanId) == undefined) {
    newSpan.textContent += inputtedBy + " ";
    newSpan.classList.add(data.initialClass, data.spanClass);
    newSpan.setAttribute("id", data.spanId);
    data.title.after(newSpan);
    console.log(data);
  } else if (
    inputtedBy != randomNumber &&
    document.getElementById(data.spanId) != undefined
  ) {
    newSpan = document.getElementById(data.spanId);
    newSpan.textContent += inputtedBy + " ";
  } else {
    newSpan.textContent += inputtedBy + " ";
    newSpan.classList.add(data.initialClass, data.spanClass);
    data.title.removeAttribute("class");
    data.title.className = data.spanClass;
    data.title.parentElement.lastChild.after(newSpan);
    document
      .getElementById(data.spanId)
      .classList.add("main-content__guesses_border");
    let elem = document.querySelector(`.${data.spanClass}`);
    let style = getComputedStyle(elem);
    document.getElementById(data.spanId).style.borderColor = style.borderColor;
  }
}

// get the user value from input
submitBtn.addEventListener("click", getTheValue);

function getTheValue() {
  userInput = document.getElementById("input").value;
  userInputSaved = userInput;

  // check if user input is a number
  try {
    if (isNaN(userInput)) throw "Not a number. Try again!";
    if (userInput == "") throw "Empty entry. Try again!";
    if (userInput == " ") throw "Empty entry. Try again!";
    if (userInput > 100) throw "Your number is higher than 100. Try again!";
    if (userInput.includes("-")) throw "Your number is less than 0. Try again!";
    if (userInput % 1 != 0)
      throw "Floating point numbers are not allowd! Try again!";
  } catch (err) {
    alert(err);
    document.getElementById("input").value = "";
    return;
  }
  //end of check

  // if a random number doesn't match the user input value
  if (userInput != randomNumber && count < 11) {
    if (userInput < randomNumber) {
      newSpan = document.createElement("span");
      sendMessage("Your number is too low", "low");
      addSpanForGuesses(userDataWrongAnswer, userInput);
      document.getElementById("input").value = "";

      userInput = document.getElementById("input").focus();
    } else if (userInput > randomNumber) {
      newSpan = document.createElement("span");
      sendMessage("Your number is too high", "high");
      document.getElementById("input").value = "";
      addSpanForGuesses(userDataWrongAnswer, userInput);
      userInput = document.getElementById("input").focus();
    }
    // check amount of attemps
    count++;
    if (count < 11) {
      guessesCounter.innerText =
        "Current attempt is: " + count + " (out of 10)";
    }

    if (count == 11) {
      sendMessage("Try again! The answer is " + randomNumber, "low");
      document.getElementById("input").value = "";
      disabledInput();
    }
    // end of check of amount of atemps

    // if a random number mutches user input
  } else {
    sendMessage("You won!", "win");
    newSpan = document.createElement("span");
    addSpanForGuesses(userDataRightAnswer, userInput);

    disabledInput();
  }

  // Computer guess
  // check if computer number is defined
  if (pcInput == undefined) {
    pcInput = Math.floor(Math.random() * 101);
    console.log("%c pcInput is undefined: " + pcInput, "color:green");
  } else {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    pcInput = getRandomIntInclusive(min, max);
    //check if computer number mutch any previous numbers from inputs
    if (previousGuesses.length > 0) {
      let tempNumber = 0;
      function iterateArray() {
        for (let i = 0; i < previousGuesses.length; i++) {
          console.log("i:" + i);
          if (previousGuesses[i] == pcInput) {
            tempNumber++;
            // tempNumber += tempNumber;
            console.log(
              "%c" +
                "item " +
                i +
                ": " +
                previousGuesses[i] +
                " pcInput: " +
                pcInput +
                " tempNumber " +
                tempNumber,
              "color:red"
            );
          }
        }
        // iterateArray();
      }
      iterateArray();
      while (tempNumber > 0) {
        tempNumber = 0;
        pcInput = getRandomIntInclusive(min, max);
        iterateArray();
      }
    }

    console.log("%c pcInput is : " + pcInput, "color:green");
  }

  // add all numbers from inputs to array
  previousGuesses.push(userInputSaved, pcInput);
  console.log("array: " + previousGuesses);

  // if computer number doesn't mutch random number
  if (pcInput != randomNumber) {
    // if pcInput is too low
    if (message.classList.contains("low")) {
      min = userInputSaved;
      if (max == undefined) {
        max = 100;
      }
      console.log("LOW: " + min, max);
      console.log("userInput: " + userInput);
      console.log("Input Value: " + document.getElementById("input").value);
      console.log("saved value: " + userInputSaved);
      newSpan = document.createElement("span");
      addSpanForGuesses(pcDataWrongAnswer, pcInput);
    }
    //if pcInput is too high
    else if (message.classList.contains("high")) {
      max = userInputSaved;
      if (min == undefined) {
        min = 0;
      }
      console.log("HIGH: " + min, max);
      console.log("userInput: " + userInput);
      console.log("Input Value: " + document.getElementById("input").value);
      console.log("saved value: " + userInputSaved);
      newSpan = document.createElement("span");
      addSpanForGuesses(pcDataWrongAnswer, pcInput);
    } else {
      newSpan = document.createElement("span");
      addSpanForGuesses(pcDataWrongAnswer, pcInput);
    }
  }
  // if computer number is the same as random number and user number
  else if (pcInput == randomNumber && userInputSaved == randomNumber) {
    sendMessage("You are both good!", "win");

    disabledInput();

    newSpan = document.createElement("span");
    addSpanForGuesses(pcDataRightAnswer, pcInput);
  }
  // if only computer number is equal to random number
  else {
    sendMessage("Computer won! Better luck next time!", "win-ai");
    newSpan = document.createElement("span");
    addSpanForGuesses(pcDataRightAnswer, pcInput);

    disabledInput();
  }
}

// reset all input fields and data
refreshBtn.addEventListener("click", refresh);
function refresh() {
  count = 1;
  message.innerText = "";
  guessesCounter.innerHTML = "";
  randomNumber = Math.floor(Math.random() * 100);
  submitBtn.removeAttribute("disabled");
  document.getElementById("input").value = "";
  refreshBtn.style.display = "none";
  message.className = "";

  document.getElementById("input").removeAttribute("disabled");
  userInput = document.getElementById("input").focus();

  previousGuesses = [];
  min = 0;
  max = 100;
  console.clear();

  while (userSection.children.length > 1) {
    userSection.removeChild(userSection.lastChild);
    console.log(userSection.children.length);
  }

  while (pcSection.children.length > 1) {
    pcSection.removeChild(pcSection.lastChild);
    console.log(pcSection.children.length);
  }

  pcInlineTitle.removeAttribute("class");
  usernInlineTitle.removeAttribute("class");
}
