class Calculator {
  constructor() {

    this.displayNegativeNumber = this.displayNegativeNumber.bind(this)
    this.canDisplayMinus = true;
    this.specialAction = "";
    this.UiSelectors = {
      history: ".calculator__history",
      display: "display",
      actualAction: '[data-actual-action]',
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
    this.displayResult.value = "";
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
    this.displayResult.value += '-';
    this.actualActionDisplay.textContent = '-'
    this.canDisplayMinus = false;
  }

  resetCalculator() {
    this.actualActionDisplay.textContent = '';
    this.displayResult.value = "";
    this.history.value = "";
    this.dotBtn.removeAttribute('disabled');
    this.canDisplayMinus = true;
    this.minusBtn.addEventListener('click', this.displayNegativeNumber)
  }

  pickDot(e) {
    if (!this.displayResult.value) {
      this.displayResult.value = '0';
    }
    this.displayResult.value += e.target.dataset.dot;
    this.dotBtn.setAttribute('disabled', true);
  }

  pickNumbers(e) {
     this.minusBtn.removeEventListener('click', this.displayNegativeNumber);
    if(!this.displayResult.value && e.target.dataset.number === '0'){
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
      this.dotBtn.removeAttribute('disabled');
    }
  }

  checkResult() {
    const historyValue = Number(this.history.value);
    const resultValue = Number(this.displayResult.value);

    switch (this.specialAction) {
      case "+":
        this.displayResult.value = this.add(historyValue, resultValue);
        this.specialAction = ''
        break;

      case "-":
        this.displayResult.value = this.subtract(historyValue, resultValue);
        this.specialAction = ''
        break;

      case "*":
        this.displayResult.value = this.multiply(historyValue, resultValue);
        this.specialAction = ''
        break;

      case "/":
        this.displayResult.value = this.divide(historyValue, resultValue);
        this.specialAction = ''
        break;

      case 'power':
        this.displayResult.value = Math.pow(historyValue, resultValue).toFixed(2);
        this.specialAction = ''
        break;

      default:
        this.history.value = this.displayResult.value;
        this.specialAction = '';
        this.actualActionDisplay.textContent = '=';
        this.dotBtn.setAttribute('disabled', true);
        break;
    }
  }

  add(a, b) {
    return (a + b).toFixed(2);
  }

  subtract(a, b) {
    return (a - b).toFixed(2);
  }

  multiply(a, b) {
    return (a * b).toFixed(2);
  }

  divide(a, b) {
    return (a / b).toFixed(2);
  }
}