const buttons = document.querySelectorAll(".btn__item");
const displayPrevious = document.querySelector(".display__previous");
const displayCurrent = document.querySelector(".display--current");

const getValue = addEventListener('click', (event) => {
    const { target: { value }} = event;
    const { target } = event;
    if (target.toString() === '[object HTMLButtonElement]') {
        if (value === "CE") {
            displayCurrent.innerHTML = displayCurrent.innerHTML.slice(0, -1)
            return;
        }
        if (value === "=") {
            const str = displayCurrent.innerHTML;
            computation(str);
            return;
        }
        displayCurrent.innerHTML += value;
        computation(value)
    }
});

buttons.forEach(elem => elem.getValue)

const computation = str => {
    const parser = str => {
        let result = [];
        const helpFunc = (str) => {
            const number = Number.isNaN(parseFloat(str)) ? '' : parseFloat(str);
            const deleteIndex = number.toString().length;
            const action = str.slice(deleteIndex)[0] || '';
            result = [...result, number, action]
            if (str.length === 0) return result.filter(e => e !== '');
            return helpFunc(str.slice(deleteIndex + 1))
        }
        return helpFunc(str)
    }
    const result = parser(str);

}