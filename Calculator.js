class Calculator {
  constructor() {
    this.specialAction = "";
    this.repeatedValue = null;

    this.UiSelectors = {
      history: ".calculator__history",
      display: "display",
      numberBtns: "[data-number]",
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
  }

  pickNumbers(e) {
    const pickedNums = (this.displayResult.value += e.target.dataset.number);
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

      default:
        break;
    }
  }

  sum(a, b) {
    return a + b;
  }
}
