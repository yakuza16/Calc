class Calculator {
  constructor() {
    this.specialAction = "";
    this.UiSelectors = {
      history: ".calculator__history",
      display: "display",
      numberBtns: "[data-number]",
      actions: "[data-action]",
      actionBtns: {
        reset: "[data-reset]",
        result: "[data-result]",
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
    this.displayResult.value = "";
    this.addListeners();
  }

  addListeners() {
    this.numberBtns.forEach((btnNum) => {
      btnNum.addEventListener("click", (e) => this.pickNumbers(e));
    });

    this.resetBtn.addEventListener("click", () => {
      this.displayResult.value = "";
      this.history.value = "";
    });

    this.resultBtn.addEventListener("click", () => this.checkResult());

    this.actions.forEach((action) => {
      action.addEventListener("click", (e) => this.action(e));
    });
  }

  pickNumbers(e) {
    this.displayResult.value += e.target.dataset.number;
  }

  action(e) {
    if (!this.specialAction) {
      this.specialAction = e.target.dataset.action;
      this.history.value = Number(this.displayResult.value);
      this.displayResult.value = "";

    }
  }

  checkResult() {
    switch (this.specialAction) {
      case "+":
        this.displayResult.value = this.add(
          Number(this.history.value),
          Number(this.displayResult.value)
        );
        this.specialAction = ''
        break;

      case "-":
        this.displayResult.value = this.substract(
          Number(this.history.value),
          Number(this.displayResult.value)
        );
        this.specialAction = ''
        break;

      case "*":
        this.displayResult.value = this.multiply(
          Number(this.history.value),
          Number(this.displayResult.value)
        );
        this.specialAction = ''
        break;

      case "/":
        this.displayResult.value = this.divide(
          Number(this.history.value),
          Number(this.displayResult.value)
        );
        this.specialAction = ''
        break;

      case 'power':
        this.displayResult.value = Math.pow(Number(this.history.value), Number(this.displayResult.value));
        this.specialAction = ''
        break;

      default:
        this.history.value = this.displayResult.value;
        this.specialAction = ''
        break;
    }
  }

  add(a, b) {
    return a + b;
  }

  substract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    return a / b;
  }
}