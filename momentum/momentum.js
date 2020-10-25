const time = document.querySelector(".time");
const date = document.querySelector(".date");
const name = document.querySelector(".name");
const focus = document.querySelector(".focus")

async function showTime() {
    let today = new Date();
    const addZero = n => (parseInt(n, 10) < 10 ? '0' : '') + n;
    const weekDate = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday' ]
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const dayWeak = weekDate[today.getDay()];
    const year = today.getFullYear();
    const hours = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    time.innerHTML = `${hours}:${addZero(min)}:${addZero(sec)}`;
    date.innerHTML = `${dayWeak}: ${addZero(day)}.${addZero(month)}.${year}`;
    setTimeout(showTime, 1000);
}

async function getName() {
    if (localStorage.getItem('name') === null) {
        name.innerHTML = 'Enter Name';
    } else {
        name.innerHTML = localStorage.getItem('name');
    }
}

function setName(e) {
    const  { keyCode } = e;
    if ( keyCode === 13) {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
    }
}

function focusName(e) {
    e.target.innerText = '';
}

async function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.innerHTML = 'Enter Focus';
    } else {
        focus.innerHTML = localStorage.getItem('focus');
    }
}

function setFocus(e) {
    const  { keyCode } = e;
    if ( keyCode === 13) {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
    }
}

function focusFocus(e) {
    e.target.innerText = '';
}

name.addEventListener('keypress', setName)
name.addEventListener('click', focusName)
name.addEventListener('blur', getName)

focus.addEventListener('keypress', setFocus)
focus.addEventListener('click', focusFocus)
focus.addEventListener('blur', getFocus)

showTime()
getName()
getFocus()