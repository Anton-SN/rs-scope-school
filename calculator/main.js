const buttons = document.querySelectorAll(".btn__item");
const displayCurrent = document.querySelector(".display--current");

let flag = 0;
let error = 'false';
const getValue = addEventListener('click', (event) => {
    const { target: { value }} = event;
    const { target } = event;
    if (target.toString() === '[object HTMLButtonElement]') {
        if (flag === 1) {
            flag = 0;
            if (target.getAttribute('class').indexOf('number') === 21) {
                displayCurrent.innerHTML = value;
                return;
            }
        }
        switch (value) {
            case 'C':
                displayCurrent.innerHTML = '';
                break;
            case 'CE':
                let dop = 1
                const lastIndex = displayCurrent.innerHTML[displayCurrent.innerHTML.length - 1];
                if (lastIndex === 't') {
                    dop = 4;
                }
                displayCurrent.innerHTML = displayCurrent.innerHTML.slice(0, -dop)
                break;
            case '=':
                const state = displayCurrent.innerHTML;
                let result = Calculator(state);

                if (typeof result === "object" && result.type === 'negative'){
                    alert('Отрицательное число под корнем!')
                    return;
                }
                if (typeof result === "object" && result.type === 'nonCorrect'){
                    alert('Некорректное выражение!')
                    return;
                }

                displayCurrent.innerHTML = result;
                // Animation
                displayCurrent.classList.add('animation');
                setTimeout(() => displayCurrent.classList.remove('animation'), 450);
                // Change Button text
                flag = result === state ? 0 : 1;
                break;
            default :
                displayCurrent.innerHTML += value;
                break;
        }
    }
});

buttons.forEach(elem => elem.getValue)

const parseStrToArray = str => {
    let result = [];
    const helpFunc = (str) => {
        const number = Number.isNaN(parseFloat(str)) ? '' : parseFloat(str);
        const deleteIndex = number.toString().length;
        let action = str.slice(deleteIndex)[0] || '';
        result = [...result, number, action]
        if (str.length === 0) return result.filter(e => e !== '');
        return helpFunc(str.slice(deleteIndex + 1))
    }
    return helpFunc(str)
}

const Calculator = str => {

    const result = parseStrToArray(str);
    // Last element action
    if (typeof result[result.length - 1] !== 'number') {
        return { type: 'nonCorrect', str }
    }

    const computation = arr => {
        let steakNum = [];
        let steakOperation = [];
        const fraction = 10000000000;

        const operations = {
            '+': 1,
            '-': 1,
            '×': 2,
            '/': 2,
            '√': 2,
            '^': 2,
        }

        const action = (op, a, b) => {
            switch (op) {
                case '+' :
                    return (a + b)/fraction;
                case '/' :
                    if (b === 0) {
                        return 0;
                    }
                    return (a / b);
                case '×' :
                    return (a * b)/fraction/fraction;
                case '-' :
                    return (a - b)/fraction;
                case '^' :
                    return Math.pow(a/fraction, b/fraction);
                case '√' :
                    if (b < 0) {
                        return 'negative number';
                    }
                    return a/fraction * Math.sqrt(b/fraction);
                default:
                    return ;
            }
        }

        const run = (nums, ops) => {
            const numberArr = nums;
            const operationArr = ops;

            const op = operationArr.pop();
            let a, b;

            if (op === '√') {
                if (nums.length === ops.length + 1) {
                    b = numberArr.pop();
                    a = 1;
                } else {
                    b = numberArr.pop();
                    a = numberArr.pop();
                }
            } else {
                b = numberArr.pop();
                a = numberArr.pop();
            }
            if (action(op, a * fraction, b * fraction) === 'negative number') {
                return 'negative number'
            }

            numberArr.push(action(op, a * fraction, b * fraction))

            if (ops.length === 0) return nums;

            return run(numberArr, operationArr)
        }

        for (let i = 0; i < arr.length; i += 1) {
            let e = arr[i]
            if (operations[e] !== undefined) {
                steakOperation.push(e)
            }
            if (operations[e] === undefined) {
                const nextOp = arr[i + 1] || 'final'
                const prevOp = steakOperation[steakOperation.length - 1] || null
                steakNum.push(e)
                if ((prevOp && operations[prevOp] >= operations[nextOp]) || nextOp === 'final' ) {
                    let total = run(steakNum, steakOperation);
                    if (total === 'negative number') {
                        return { type: 'negative', str }
                    }
                    steakNum = total;
                }
            }
        }
        return steakNum[0]
    }

    return result.length === 1 ? result[0] : computation(result)
}
