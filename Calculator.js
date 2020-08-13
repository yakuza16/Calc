class Calculator {
    constructor() {

        this.chosenNumbers = [];
        this.secondNumbers = [];
        this.specialAction = '';
        this.repeatedValue = null;


        this.UiSelectors = {
            history: '.history',
            display: 'display',
            numberBtns: '[data-number]',
            actionBtns: {
                reset: '[data-reset]',
                addition: '[data-addition]',
                substraction: '[data-substraction]',
                multiply: '[data-multiply]',
                divide: '[data-divide]',
                dot: '[data-dot]',
                result: '[data-result]'
            },
        }
    }
    initializeCalculator() {
        this.displayResult = document.getElementById(this.UiSelectors.display)
        this.history = document.querySelector(this.UiSelectors.history)
        this.numberBtns = [...document.querySelectorAll(this.UiSelectors.numberBtns)]
        this.resetBtn = document.querySelector(this.UiSelectors.actionBtns.reset)
        this.addBtn = document.querySelector(this.UiSelectors.actionBtns.addition)
        this.resultBtn = document.querySelector(this.UiSelectors.actionBtns.result)



        this.displayResult.value = 0

        this.addListeners()



    }

    addListeners() {
        this.numberBtns.forEach(btnNum => {
            btnNum.addEventListener('click', (e) => this.pickNumbers(e))
        })

        this.resetBtn.addEventListener('click', () => {
            this.chosenNumbers = [];
            this.secondNumbers = [];
            this.displayResult.value = 0;
            this.history.textContent = ''
        })

        this.addBtn.addEventListener('click', () => this.add())

        this.resultBtn.addEventListener('click', () => this.checkResult())



    }

    pickNumbers(e) {
        if (!this.specialAction) {
            this.chosenNumbers.push(e.target.dataset.number)
            let num = Number(this.chosenNumbers.join(''));
            this.displayResult.value = num;
            this.history.textContent = this.displayResult.value
        } else {
            this.secondNumbers.push(e.target.dataset.number)
            let nums = Number(this.secondNumbers.join(''));
            this.displayResult.value = nums
        }

    }

    add() {
        this.specialAction = '+';
        this.displayResult.value += this.specialAction
    }

    checkResult() {
        switch (this.specialAction) {
            case '+':
                if (!this.repeatedValue) {
                    let firstNums = Number(this.chosenNumbers.join(''))
                    let secondNums = Number(this.secondNumbers.join(''))
                    this.repeatedValue = firstNums + secondNums
                    console.log(this.repeatedValue);
                    this.displayResult.value = firstNums + secondNums;
                    this.history.textContent = this.displayResult.value
                    this.specialAction = '';
                    this.chosenNumbers = [];
                    this.secondNumbers = [];
                } else {
                    this.chosenNumbers = this.repeatedValue
                    console.log(this.repeatedValue);
                    this.displayResult.value = this.repeatedValue + Number(this.secondNumbers.join(''));



                }






                break;

            default:
                break;
        }


    }



}