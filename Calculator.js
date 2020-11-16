const EMPTY_STRING = '';
const SIGN_ADDITION = "+";
const SIGN_DIVIDE = "/";
const SIGN_EQUAL = "=";
const SIGN_MULTIPLY = "*";
const SIGN_POWER = "power";
const SIGN_SUBTRACTION = "-";
const ZERO_NUMBER_STRING = "0";

class Calculator {
  constructor() {

    this.displayNegativeNumber = this.displayNegativeNumber.bind(this)
    this.canDisplayMinus = true;
    this.specialAction = EMPTY_STRING;
    this.UiSelectors = {
      history: ".calculator__history",
      display: "display",
      actualAction: "[data-actual-action]",
      numberBtns: "[data-number]",
      actions: "[data-action]",
      actionBtns: {
        reset: "[data-reset]",
        result: "[data-result]",
        dot: "[data-dot]",
        minus: "[data-action='-']"
      },
    };
  }
  initializeCalculator() {
    this.displayResult = document.getElementById(this.UiSelectors.display);
    this.history = document.querySelector(this.UiSelectors.history);
    this.numberBtns = [
      ...document.querySelectorAll(this.UiSelectors.numberBtns),
    ];
    this.resetBtn = document.querySelector(this.UiSelectors.actionBtns.reset);
    this.resultBtn = document.querySelector(this.UiSelectors.actionBtns.result);
    this.actions = document.querySelectorAll(this.UiSelectors.actions);
    this.dotBtn = document.querySelector(this.UiSelectors.actionBtns.dot);
    this.actualActionDisplay = document.querySelector(this.UiSelectors.actualAction);
    this.minusBtn = document.querySelector(this.UiSelectors.actionBtns.minus)
    this.displayResult.value = '';
    this.addListeners();
  }

  addListeners() {
    this.numberBtns.forEach((btnNum) => {
      btnNum.addEventListener("click", (e) => this.pickNumbers(e));
    });

    this.resetBtn.addEventListener("click", () => this.resetCalculator());

    this.resultBtn.addEventListener("click", () => this.checkResult());

    this.actions.forEach((action) => {
      action.addEventListener("click", (e) => this.action(e));
    });
    this.dotBtn.addEventListener('click', (e) => this.pickDot(e));
    this.minusBtn.addEventListener('click', this.displayNegativeNumber)

  }

  displayNegativeNumber() {
    this.displayResult.value += SIGN_SUBTRACTION;
    this.actualActionDisplay.textContent = SIGN_SUBTRACTION;
    this.canDisplayMinus = false;
  }

  resetCalculator() {
    this.actualActionDisplay.textContent = EMPTY_STRING;
    this.displayResult.value = EMPTY_STRING;
    this.history.value = EMPTY_STRING;
    this.dotBtn.removeAttribute("disabled");
    this.canDisplayMinus = true;
    this.minusBtn.addEventListener("click", this.displayNegativeNumber)
  }

  pickDot(e) {
    if (!this.displayResult.value) {
      this.displayResult.value = ZERO_NUMBER_STRING;
    }
    this.displayResult.value += e.target.dataset.dot;
    this.dotBtn.setAttribute("disabled", true);
  }

  pickNumbers(e) {
     this.minusBtn.removeEventListener("click", this.displayNegativeNumber);
    if(!this.displayResult.value && e.target.dataset.number === ZERO_NUMBER_STRING){
      return
    }
   
    this.displayResult.value += e.target.dataset.number;
  }

  action(e) {
    if (!this.displayResult.value) {
      return
    }
    if (!this.specialAction) {
      this.specialAction = e.target.dataset.action;
      this.actualActionDisplay.textContent = this.specialAction;
      this.history.value = Number(this.displayResult.value);
      this.displayResult.value = "";
      this.dotBtn.removeAttribute("disabled");
    }
  }

  checkResult() {
    const historyValue = Number(this.history.value);
    const resultValue = Number(this.displayResult.value);

    switch (this.specialAction) {
      case SIGN_ADDITION:
        this.displayResult.value = this.add(historyValue, resultValue);
        this.specialAction = EMPTY_STRING
        break;

      case SIGN_SUBTRACTION:
        this.displayResult.value = this.subtract(historyValue, resultValue);
        this.specialAction = EMPTY_STRING
        break;

      case SIGN_MULTIPLY:
        this.displayResult.value = this.multiply(historyValue, resultValue);
        this.specialAction = EMPTY_STRING
        break;

      case SIGN_DIVIDE:
        this.displayResult.value = this.divide(historyValue, resultValue);
        this.specialAction = EMPTY_STRING
        break;

      case SIGN_POWER:
        this.displayResult.value = Math.pow(historyValue, resultValue).toFixed(2);
        this.specialAction = EMPTY_STRING
        break;

      default:
        this.history.value = this.displayResult.value;
        this.specialAction = EMPTY_STRING;
        this.actualActionDisplay.textContent = SIGN_EQUAL;
        this.dotBtn.setAttribute('disabled', true);
        break;
    }
  }

  add(firstNum, secondNum) {
    return (firstNum + secondNum).toFixed(2);
  }

  subtract(firstNum, secondNum) {
    return (firstNum - secondNum).toFixed(2);
  }

  multiply(firstNum, secondNum) {
    return (firstNum * secondNum).toFixed(2);
  }

  divide(firstNum, secondNum) {
    return (firstNum / secondNum).toFixed(2);
  }
}