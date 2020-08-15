class Calculator {
  constructor() {
    this.specialAction = "";
    this.repeatedValue = null;

    this.UiSelectors = {
      history: ".calculator__history",
      display: "display",
      numberBtns: "[data-number]",
      actions: "[data-action]",
      actionBtns: {
        reset: "[data-reset]",
        addition: "[data-addition]",
        substraction: "[data-substraction]",
        multiply: "[data-multiply]",
        divide: "[data-divide]",
        dot: "[data-dot]",
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
    this.addBtn = document.querySelector(this.UiSelectors.actionBtns.addition);
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

    this.addBtn.addEventListener("click", () => this.add());

    this.resultBtn.addEventListener("click", () => this.checkResult());

    this.actions.forEach((action) => {
      action.addEventListener("click", (e) => this.action(e));
    });
  }

  pickNumbers(e) {
    const pickedNums = (this.displayResult.value += e.target.dataset.number);
  }

  action(e) {
    console.log("hej");
    if (!this.specialAction) {
      this.specialAction = e.target.dataset.action;
      this.history.value = Number(this.displayResult.value);
      this.displayResult.value = "";
    }
  }

  add() {
    if (!this.specialAction) {
      this.specialAction = "+";
      this.history.value = Number(this.displayResult.value);
      this.displayResult.value = "";
    }
  }

  checkResult() {
    switch (this.specialAction) {
      case "+":
        this.displayResult.value = this.sum(
          Number(this.history.value),
          Number(this.displayResult.value)
        );
        this.specialAction = "";
        break;

      case "-":
        this.displayResult.value = this.substract(
          Number(this.history.value),
          Number(this.displayResult.value)
        );
        this.specialAction = "";
        break;

      default:
        break;
    }
  }

  sum(a, b) {
    return a + b;
  }

  substract(a, b) {
    return a - b;
  }
}
