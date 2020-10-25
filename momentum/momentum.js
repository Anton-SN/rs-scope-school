const time = document.querySelector(".time");
const date = document.querySelector(".date");
const name = document.querySelector(".name");
const focus = document.querySelector(".focus")

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

const next = document.querySelector('.next');
let i = 0;
const arr = [
    '01.jpg', '02.jpg', '03.jpg', '04.jpg',
    '05.jpg', '06.jpg', '07.jpg', '08.jpg',
    '09.jpg', '10.jpg', '11.jpg', '12.jpg',
    '13.jpg', '14.jpg', '15.jpg', '16.jpg',
    '17.jpg', '18.jpg', '19.jpg', '20.jpg'
];

const imagesArr = (arr) => {
    const now = new Date();
    const hours = now.getHours();
    const shuffle = arr => {
        const array = [...arr];
        let i = array.length,
            j = 0,
            temp;
        while (i--) {
            j = Math.floor(Math.random() * (i+1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        array.length = 6;
        return array;
    }
    const dayArr = shuffle(arr).map(e => `./images/day/${e}`);
    const eveningArr = shuffle(arr).map(e => `./images/evening/${e}`);
    const morningArr = shuffle(arr).map(e => `./images/morning/${e}`);
    const nightArr = shuffle(arr).map(e => `./images/night/${e}`);
    const generalArray = [...nightArr, ...morningArr, ...dayArr, ...eveningArr];
    const finalArr = [...generalArray, ...generalArray].slice(hours);
    finalArr.length = 24;
    return finalArr;
};
const pictures = imagesArr(arr);

async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}

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

async function getWeather() {
    if (localStorage.getItem('city') === null) {
        city.innerHTML = 'Saint Petersburg';
    } else {
        city.innerHTML = localStorage.getItem('city');
    }
    const id = 'fcf39f3e76637b63b2a590c2e64b3cdb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&lang=ru&appid=${id}&units=metric`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C, ${data.wind.speed} m/s, ${data.main.humidity}%`;
        weatherDescription.textContent = data.weather[0].description;
    } catch (e) {
        console.log(e)
        alert('City not found');
        localStorage.setItem('city', 'Saint Petersburg');
        getWeather();
    }
}

function setCity(e) {
    const  { keyCode } = e;
    if (keyCode === 13) {
        localStorage.setItem('city', e.target.innerText);
        city.blur();
    }
}

function focusCity(e) {
    e.target.innerText = '';
}

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

function getImage() {
    const index = i % pictures.length;
    const imageSrc = pictures[index];
    viewBgImage(imageSrc);
    i += 1;
    next.disabled = true;
    setTimeout(function() { next.disabled = false }, 1000);
}

name.addEventListener('keypress', setName)
name.addEventListener('click', focusName)
name.addEventListener('blur', getName)

focus.addEventListener('keypress', setFocus)
focus.addEventListener('click', focusFocus)
focus.addEventListener('blur', getFocus)

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

city.addEventListener('keypress', setCity);
city.addEventListener('click', focusCity)
city.addEventListener('blur', getWeather)
document.addEventListener('DOMContentLoaded', getWeather);

next.addEventListener('click', getImage);

showTime()
getName()
getFocus()
getWeather()
getImage()