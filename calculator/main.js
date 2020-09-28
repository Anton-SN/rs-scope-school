const buttons = document.querySelectorAll(".btn__item");
const displayPrevious = document.querySelector(".display__previous");
const displayCurrent = document.querySelector(".display--current");
const deleteBtn = document.querySelector(".delete");

let flag = 0;
let error = 'false';
const getValue = addEventListener('click', (event) => {
    const { target: { value }} = event;
    const { target } = event;
    if (target.toString() === '[object HTMLButtonElement]') {
        if (flag === 1) {
            flag = 0;
            deleteBtn.innerHTML = 'CE'
            deleteBtn.value = "CE";
            if (error) {
                displayPrevious.innerHTML = `Ans = 0`;
                displayCurrent.innerHTML = '';
                if (target.getAttribute('class').indexOf('number') === 21) {
                    displayCurrent.innerHTML = value;
                    return;
                }
                return;
            }
            if (value === 'AC') {
                displayPrevious.innerHTML = `Ans = ${displayCurrent.innerHTML}`;
                displayCurrent.innerHTML = '';
                return;
            }
            if (target.getAttribute('class').indexOf('number') === 21) {
                displayCurrent.innerHTML = value;
                return;
            }
            if (value === "A") {
                displayCurrent.innerHTML += `*${displayPrevious.innerHTML.slice(6)}`;
                return;
            }
        }
        if (value === "A") {
            if (!isNaN(+displayCurrent.innerHTML.slice(-1))) {
                displayCurrent.innerHTML += `*${displayPrevious.innerHTML.slice(6)}`;
                return;
            }
            displayCurrent.innerHTML += displayPrevious.innerHTML.slice(6);
            return;
        }
        if (value === "CE") {
            let dop = 1
            const lastIndex = displayCurrent.innerHTML[displayCurrent.innerHTML.length - 1];
            if (lastIndex === 't') {
                dop = 4;
            }
            displayCurrent.innerHTML = displayCurrent.innerHTML.slice(0, -dop)
            return;
        }
        if (value === "=") {
            const str = displayCurrent.innerHTML;
            displayPrevious.innerHTML = `${str} = `;
            displayCurrent.innerHTML = isNaN(Calculator(str)) === true ? "Отрицательное число" : Calculator(str);
            displayCurrent.classList.add('animation');
            setTimeout(() => displayCurrent.classList.remove('animation'), 450);
            deleteBtn.innerHTML = "AC";
            deleteBtn.value = "AC";
            flag = Calculator(str) === str ? 0 : 1;
            error = displayCurrent.innerHTML === "Отрицательное число";
            return;
        }
        displayCurrent.innerHTML += value;
    }
});

buttons.forEach(elem => elem.getValue)

const Calculator = str => {
    const parser = str => {
        let result = [];
        const helpFunc = (str) => {
            const number = Number.isNaN(parseFloat(str)) ? '' : parseFloat(str);
            const deleteIndex = number.toString().length;
            let action = str.slice(deleteIndex)[0] || '';
            let dop = 1;

            if (action === 's') {
                dop = 4;
                action = 'sqrt'
            }

            result = [...result, number, action]
            if (str.length === 0) return result.filter(e => e !== '');
            return helpFunc(str.slice(deleteIndex + dop))
        }
        return helpFunc(str)
    }
    const result = parser(str);

    if (typeof result[result.length - 1] !== 'number') {
        return str;
    }

    const computation = (arr) => {
        let steakNum = [];
        let steakOperation = [];

        const operations = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            'sqrt': 2,
            '^': 2,
        }

        const action = (op, a, b) => {
            switch (op) {
                case '+' :
                    return (a + b)/10000;
                case '/' :
                    if (b === 0) {
                        return 0;
                    }
                    return (a / b);
                case '*' :
                    return (a * b)/10000/10000;
                case '-' :
                    return (a - b)/10000;
                case '^' :
                    return Math.pow(a/10000, b/10000);
                case 'sqrt' :
                    if (b < 0) {
                        return NaN;
                    }
                    return a/10000 * Math.sqrt(b/10000);
                default:
                    return ;
            }
        }

        const run = (nums, ops) => {
            const numberArr = nums;
            const operationArr = ops;

            const op = operationArr.pop();
            let a, b;

            if (op === 'sqrt') {
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

            numberArr.push(action(op, a * 10000, b * 10000))

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
                    steakNum = run(steakNum, steakOperation)
                }
            }
        }
        return steakNum[0]
    }
    return result.length === 1 ? result[0] : computation(result)
}
