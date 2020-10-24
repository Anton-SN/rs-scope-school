let time = document.getElementById("time");
let date = document.getElementById("date");

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

showTime()