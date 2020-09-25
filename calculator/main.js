const buttons = document.querySelectorAll(".btn__item");
const displayPrevious = document.querySelector(".display__previous");
const displayCurrent = document.querySelector(".display--current");

const getValue = addEventListener('click', (event) => {
    const { target: { value }} = event;
    const { target } = event;
    if (target.toString() === '[object HTMLButtonElement]') {
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
            displayCurrent.innerHTML = Calculator(str);
            displayCurrent.classList.add('animation')
            setTimeout(() => displayCurrent.classList.remove('animation'), 450)
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
    // Ошибка не завершено выражение
    if (typeof result[result.length - 1] !== 'number') {
        console.log('NaN')
        return;
    }
    console.log(result)
    console.log('------------------------------------------')

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
                    return a + b
                case '/' :
                    return a / b
                case '*' :
                    return a * b
                case '-' :
                    return a - b
                case '^' :
                    return Math.pow(a, b)
                case 'sqrt' :
                    return a * Math.sqrt(b)
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

            numberArr.push(action(op, a, b))

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
    return computation(result)
}
