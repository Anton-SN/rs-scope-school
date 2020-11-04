window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const openBtn = document.querySelector('.open-keyboard')
const closeBtn = document.querySelector('.close-keyboard')
const input = document.querySelector('.use-keyboard-input')
const rec = new SpeechRecognition();

const keyLayout = {
    eng:
        [
            "`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "sound", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[", "]" , "\\",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "lang",
            "microphone", "space", 'left', 'top', 'bottom', 'right'
        ],
    engShift:
        [
            "~","!", "@", "#", "$", "%", "%", "^", "*", "(", ")", "_", "+", "backspace",
            "sound", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P","{", "}" , "|",
            "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "enter",
            "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "lang",
            "microphone", "space", 'left', 'top', 'bottom', 'right'
        ],
    rus:
        [
            "ё","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "sound", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж", "э", "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "lang",
            "microphone", "space", 'left', 'top', 'bottom', 'right'
        ],
    rusShift:
        [
            "Ё","!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
            "sound", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/",
            "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д","Ж", "Э", "enter",
            "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "lang",
            "microphone", "space", 'left', 'top', 'bottom', 'right'
        ],
};

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        // ru - true, eng - false
        lang: false,
        sound: true,
        mic: false,
        capsLock: false,
        shift: false,
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();

        // Creates HTML for an icon
        const createIconHTML = (icon_name, type) => {
            switch (type) {
                case "shift":
                    return `<i style="transform: rotate(90deg)" class="material-icons">${icon_name}</i>`;
                case "top":
                    return `<i style="transform: rotate(90deg)" class="material-icons">${icon_name}</i>`;
                case "bottom":
                    return `<i style="transform: rotate(-90deg)" class="material-icons">${icon_name}</i>`;
                default:
                        return `<i  class="material-icons">${icon_name}</i>`;
            }
        };

        keyLayout[this.properties.lang ? 'rus' : 'eng'].forEach((key, i) => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "\\", "enter", "lang"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            keyElement.classList.add(`${keyLayout.rus[i]}`)
            keyElement.classList.add(`${keyLayout.eng[i]}`)
            keyElement.classList.add(`${keyLayout.rusShift[i]}`)
            keyElement.classList.add(`${keyLayout.engShift[i]}`)

            if (key === 'caps') keyElement.classList.add("caps");
            if (key === 'shift') keyElement.classList.add("shift");
            if (key === 'space') keyElement.classList.add("space");
            if (key === 'enter') keyElement.classList.add("enter");
            if (key === 'backspace') keyElement.classList.add("backspace");
            if (key === 'left') keyElement.classList.add("left");
            if (key === 'top') keyElement.classList.add("top");
            if (key === "bottom") keyElement.classList.add("bottom");
            if (key === 'right') keyElement.classList.add("right");

            if (key === '1') keyElement.classList.add("digit1");
            if (key === '2') keyElement.classList.add("digit2");
            if (key === '3') keyElement.classList.add("digit3");
            if (key === '4') keyElement.classList.add("digit4");
            if (key === '5') keyElement.classList.add("digit5");
            if (key === '6') keyElement.classList.add("digit6");
            if (key === '7') keyElement.classList.add("digit7");
            if (key === "8") keyElement.classList.add("digit8");
            if (key === '9') keyElement.classList.add("digit9");
            if (key === '0') keyElement.classList.add("digit0");

            if (key === '`') keyElement.classList.add("backquote");
            if (key === '-') keyElement.classList.add("minus");
            if (key === '=') keyElement.classList.add("equal");
            if (key === '[') keyElement.classList.add("bracketLeft");
            if (key === ']') keyElement.classList.add("bracketRight");
            if (key === '\\') keyElement.classList.add("backslash");
            if (key === ';') keyElement.classList.add("semicolon");
            if (key === "'") keyElement.classList.add("quote");
            if (key === ',') keyElement.classList.add("comma");
            if (key === '.') keyElement.classList.add("period");
            if (key === '/') keyElement.classList.add("slash");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/1_backspace.mp3' : './assets/sound/4_backspace.mp3'
                        audio.autoplay = this.properties.sound;

                        const start = input.selectionStart;
                        if (start === 0) {
                            input.focus();
                            return;
                        }
                        let before = this.properties.value.slice(0, start - 1);
                        let after =  this.properties.value.slice(start,  this.properties.value.length)
                        console.log(before, after)
                        this.properties.value = before + after;
                        input.value = this.properties.value;
                        input.focus();
                        input.selectionStart = start - 1;
                        input.selectionEnd = start - 1;

                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                        input.focus();

                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/1_caps.wav' : './assets/sound/4_caps.mp3'
                        audio.autoplay = this.properties.sound

                    });

                    break;

            case "sound":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "keyboard__key--active");
                keyElement.innerHTML = createIconHTML("queue_music");

                keyElement.addEventListener("click", () => {
                    input.focus();
                    keyElement.classList.toggle("keyboard__key--active", !this.properties.sound);

                    const audio = new Audio();
                    audio.src = this.properties.lang ? './assets/sound/2_keys.mp3' : './assets/sound/6_keys.mp3'
                    audio.autoplay = this.properties.sound

                    this._toggleSound();
                });

                    break;

                case 'microphone':
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("mic");


                    keyElement.addEventListener("click", () => {
                        input.focus();
                        this._toggleMic();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.mic);

                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/2_keys.mp3' : './assets/sound/6_keys.mp3'
                        audio.autoplay = this.properties.sound;
                    });

                    break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_return", 'shift');

                    keyElement.addEventListener("click", () => {
                        keyElement.classList.toggle("keyboard__key--active", !this.properties.shift);
                        const start = input.selectionStart;
                        input.focus();
                        input.selectionStart = start;
                        input.selectionEnd = start;

                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/1_shift.wav' : './assets/sound/4_shift.mp3'
                        audio.autoplay = this.properties.sound

                        this._toggleShift()
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        const start = input.selectionStart;
                        let before = this.properties.value.slice(0, start);
                        let after =  this.properties.value.slice(start,  this.properties.value.length)
                        before += "\n";
                        this.properties.value = before + after;
                        input.value = this.properties.value;
                        input.focus();
                        input.selectionStart = start + 1;
                        input.selectionEnd = start + 1;

                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/1_enter.wav' : './assets/sound/5_enter.mp3'
                        audio.autoplay = this.properties.sound;

                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        const start = input.selectionStart;
                        let before = this.properties.value.slice(0, start);
                        let after =  this.properties.value.slice(start,  this.properties.value.length)
                        before += " ";
                        this.properties.value = before + after;
                        input.value = this.properties.value;
                        input.focus();
                        input.selectionStart = start + 1;
                        input.selectionEnd = start + 1;

                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/2_keys.mp3' : './assets/sound/6_keys.mp3';
                        audio.autoplay = this.properties.sound;

                        this._triggerEvent("oninput");
                    });

                    break;

                case "left":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

                    keyElement.addEventListener("click", (e) => {
                        input.focus();
                        const start = input.selectionStart;
                        input.focus();
                        input.selectionStart = start - 1 >= 0 ? start - 1 : 0;
                        input.selectionEnd = start - 1 >= 0 ? start - 1 : 0;

                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/2_keys.mp3' : './assets/sound/6_keys.mp3';
                        audio.autoplay = this.properties.sound;

                        this._triggerEvent("oninput");
                    });

                    break;

                case "top":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_left", "top");
                    keyElement.style = "height: 20px; width: 80px"

                    keyElement.addEventListener("click", () => {
                        const start = input.selectionStart;
                        const current = this.properties.value.slice(0, start).split("\n");
                        input.focus();
                        if (current.length === 1) {
                            input.selectionStart = 0
                            input.selectionEnd = 0;
                            return;
                        }
                        const begin = current.reduce((acc, e, i) =>
                            (i !== current.length - 1) && (i !== current.length - 2) ? acc + e.length + 1: acc, 0)
                        let dop
                        if (current[current.length - 1].length > current[current.length - 2].length) {
                            dop = current[current.length - 2].length
                        } else {
                            dop = current[current.length - 1].length
                        }
                        input.selectionStart = begin + dop;
                        input.selectionEnd = begin + dop;

                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/2_keys.mp3' : './assets/sound/6_keys.mp3'
                        audio.autoplay = this.properties.sound

                        this._triggerEvent("oninput");
                    });

                    break;

                case "bottom":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.classList.add("arrow__bottom");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_left", "bottom");
                    keyElement.style = "height: 20px"

                    keyElement.addEventListener("click", () => {
                        const start = input.selectionStart;
                        const all = this.properties.value.split('\n');
                        const current = this.properties.value.slice(0, start).split("\n");
                        input.focus();
                        if (current.length === all.length) {
                            const end = all.reduce((acc, e, i) =>acc + e.length + 1, 0)
                            input.selectionStart = end
                            input.selectionEnd = end;
                            return;
                        }
                        const begin = current.reduce((acc, e, i) =>
                            (i !== current.length - 1) ? acc + e.length + 1: acc, 0)
                        let dop
                        if (current[current.length - 1].length > all[current.length].length) {
                            dop = all[current.length].length + all[current.length - 1].length + 1
                        } else {
                            dop = current[current.length - 1].length + all[current.length - 1].length + 1
                        }
                        input.selectionStart = begin + dop;
                        input.selectionEnd = begin + dop;

                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/2_keys.mp3' : './assets/sound/6_keys.mp3'
                        audio.autoplay = this.properties.sound

                        this._triggerEvent("oninput");
                    });

                    break;

                case "right":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

                    keyElement.addEventListener("click", () => {
                        input.focus();
                        const start = input.selectionStart;
                        input.focus();
                        input.selectionStart = start + 1;
                        input.selectionEnd = start + 1;

                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/2_keys.mp3' : './assets/sound/6_keys.mp3'
                        audio.autoplay = this.properties.sound

                        this._triggerEvent("oninput");
                    });

                    break;

                case "lang":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "lang")
                    keyElement.textContent = this.properties.lang ? "ru" : "eng";

                    keyElement.addEventListener("click", () => {
                        keyElement.classList.toggle("keyboard__key--active", !this.properties.lang);
                        const start = input.selectionStart;
                        input.focus();
                        input.selectionStart = start;
                        input.selectionEnd = start;
                        this._toggleLang();

                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/2_keys.mp3' : './assets/sound/6_keys.mp3'
                        audio.autoplay = this.properties.sound

                        keyElement.textContent = this.properties.lang ? "ru" : "eng";
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", (e) => {
                        const start = input.selectionStart;
                        let before = this.properties.value.slice(0, start);
                        let after =  this.properties.value.slice(start,  this.properties.value.length)
                        before += e.target.textContent;
                        this.properties.value = before + after;
                        input.value = this.properties.value;
                        input.focus();
                        input.selectionStart = start + 1;
                        input.selectionEnd = start + 1;

                        const audio = new Audio();
                        audio.src = this.properties.lang ? './assets/sound/2_keys.mp3' : './assets/sound/6_keys.mp3'
                        audio.autoplay = this.properties.sound

                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleMic() {
        this.properties.mic = !this.properties.mic;
        rec.continuous = true;
        rec.lang = this.properties.lang ? "ru" : "en-GB";
        let dop = input.value;
        rec.addEventListener("result", (e) => {
            let text = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join(' ');
            this.properties.value = dop + text;
            input.value = this.properties.value;
        })
        if (this.properties.mic) {
            rec.start();
        } else {
            rec.stop();
        }
    },

    _toggleSound() {
        this.properties.sound = !this.properties.sound;
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                if (key.textContent === "ru" || key.textContent === "eng") break;
                const shift = this.properties.shift;
                key.textContent = !shift && this.properties.capsLock? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
        this._toggleShift(true)
    },

    _toggleShift(changeText) {
        if (changeText) {
            this.elements.keys.forEach((e, i) => {
                const lang = this.properties.lang ? "rus" : "eng";
                const shift = this.properties.shift;
                const label = lang + 'Shift'
                const caps = this.properties.capsLock
                if (shift) {
                    if (keyLayout[lang][i].length <= 2) {
                        if (caps) {
                            e.textContent = keyLayout[label][i].toLowerCase();
                            return;
                        }
                        e.textContent = keyLayout[label][i]
                    }
                } else {
                    if (keyLayout[lang][i].length <= 2) {
                        if (caps) {
                            e.textContent = keyLayout[lang][i].toUpperCase();
                            return;
                        }
                        e.textContent = keyLayout[lang][i]
                    }
                }
            })
        } else {
            this.properties.shift = !this.properties.shift;
            this.elements.keys.forEach((e, i) => {
                const lang = this.properties.lang ? "rus" : "eng";
                const shift = this.properties.shift;
                const label = lang + 'Shift'
                const caps = this.properties.capsLock
                if (shift) {
                    if (keyLayout[lang][i].length <= 2) {
                        if (caps) {
                            e.textContent = keyLayout[label][i].toLowerCase();
                            return;
                        }
                        e.textContent = keyLayout[label][i]
                    }
                } else {
                    if (keyLayout[lang][i].length <= 2) {
                        if (caps) {
                            e.textContent = keyLayout[lang][i].toUpperCase();
                            return;
                        }
                        e.textContent = keyLayout[lang][i]
                    }
                }
            })
        }
    },

    _toggleLang(keyLang) {
        if (keyLang) {
            const btnLang = document.querySelector('.lang')
            btnLang.textContent = keyLang === "rus" ? "ru" : "eng";
            this.properties.lang = keyLang === "rus";
            const caps = this.properties.capsLock;
            const shift = this.properties.shift;
            this.elements.keys.forEach((e, i) => {
                if (keyLayout[keyLang][i].length <= 2) {
                    if (caps && !shift) {
                        e.textContent = keyLayout[keyLang][i].toUpperCase();
                        return;
                    }
                    if (shift && !caps) {
                        e.textContent = keyLayout[lang + 'Shift'][i].toUpperCase();
                        return;
                    }
                    if (caps && shift) {
                        e.textContent = keyLayout[lang + 'Shift'][i].toLowerCase();
                        return;
                    }
                    e.textContent = keyLayout[keyLang][i]
                }
            })
        }
        else
        {
            this.properties.lang = !this.properties.lang;
            const lang = this.properties.lang ? "rus" : "eng";
            const caps = this.properties.capsLock;
            const shift = this.properties.shift;
            this.elements.keys.forEach((e, i) => {
                if (keyLayout[lang][i].length <= 2) {
                    if (shift && !caps) {
                        e.textContent = keyLayout[lang + 'Shift'][i].toUpperCase();
                        return;
                    }
                    if (caps && !shift) {
                        e.textContent = keyLayout[lang][i].toUpperCase();
                        return;
                    }
                    if (caps && shift) {
                        e.textContent = keyLayout[lang + 'Shift'][i].toLowerCase();
                        return;
                    }
                    e.textContent = keyLayout[lang][i]
                }
            })
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

const keyBoardOpen = () => {
    const initialValue = input.value;
    input.focus();
    Keyboard.open(initialValue);
    openBtn.classList.add('hidden');
    closeBtn.classList.remove('hidden');
}

const keyBoardClose = () => {
    Keyboard.close();
    openBtn.classList.remove('hidden');
    closeBtn.classList.add('hidden');
}

const inputText = e => {
    const value = e.key;
    if (
        value[value.length - 1] !== undefined &&
        value !== "Enter" &&
        value !== "Shift" &&
        value !== "CapsLock" &&
        value !== "Control" &&
        value !== "Tab" &&
        value !== "Backspace" &&
        value !== "Delete" &&
        value !== "Alt" &&
        value !== " " &&
        value !== "ArrowUp" &&
        value !== "ArrowRight" &&
        value !== "ArrowLeft" &&
        value !== "ArrowDown" &&
        value[value.length - 1].charCodeAt(0) >= 1072 &&
        value[value.length - 1].charCodeAt(0) <= 1103) Keyboard._toggleLang("rus")
    if (
        value[value.length - 1] !== undefined &&
        value !== "Enter" &&
        value !== "Shift" &&
        value !== "CapsLock" &&
        value !== "Control" &&
        value !== "Tab" &&
        value !== "Backspace" &&
        value !== "Delete" &&
        value !== "Alt" &&
        value !== " " &&
        value !== "ArrowUp" &&
        value !== "ArrowRight" &&
        value !== "ArrowLeft" &&
        value !== "ArrowDown" &&
        value[value.length - 1].charCodeAt(0) <= 122 &&
        value[value.length - 1].charCodeAt(0) >= 97) Keyboard._toggleLang("eng")
    Keyboard.properties.value = input.value;
}

let pressed = true;

const backlightKeyboard = e => {
    const key = e.key;
    // service keys
    if (Keyboard.properties.lang) {
        if (key === '4' || key === ";") {
            document.querySelector('.digit4').classList.add("keyboard__key__focus");
            return;
        }
        if (key === '6' || key === ":") {
            document.querySelector('.digit6').classList.add("keyboard__key__focus");
            return;
        }
        if (key === '7' || key === "?") {
            document.querySelector('.digit7').classList.add("keyboard__key__focus");
            return;
        }
        if (key === ';' || key === ':') {
            document.querySelector('.semicolon').classList.add("keyboard__key__focus");
            return;
        }
        if (key === "'" || key === '"') {
            document.querySelector('.digit2').classList.add("keyboard__key__focus");
            return;
        }
        if (key === "/") {
            document.querySelector('.backslash').classList.add("keyboard__key__focus");
            return;
        }
        if (key === '.' || key === ',') {
            document.querySelector('.slash').classList.add("keyboard__key__focus");
            return;
        }
    }
    if (key === 'CapsLock') {
        document.querySelector('.caps').classList.toggle("keyboard__key__focus",  !Keyboard.properties.capsLock);
        Keyboard._toggleCapsLock();
        console.log(Keyboard.properties)
        document.querySelector('.caps').classList.toggle("keyboard__key--active", Keyboard.properties.capsLock);
        return;
    }
    if (key === 'Shift') {
        if (pressed) {
            pressed = false;
            document.querySelector('.shift').classList.add("keyboard__key__focus");
            Keyboard._toggleShift();
            document.querySelector('.shift').classList.toggle("keyboard__key--active", Keyboard.properties.shift);
            return;
        }
        return;
    }
    if (key === ' ') {
        document.querySelector('.space').classList.add("keyboard__key__focus");
        return;
    }
    if (key === 'Enter') {
        document.querySelector('.enter').classList.add("keyboard__key__focus");
        return;
    }
    if (key === 'Backspace') {
        document.querySelector('.backspace').classList.add("keyboard__key__focus");
        return;
    }
    if (key === 'ArrowLeft') {
        document.querySelector('.left').classList.add("keyboard__key__focus");
        return;
    }
    if (key === 'ArrowUp') {
        document.querySelector('.top').classList.add("keyboard__key__focus");
        return;
    }
    if (key === "ArrowDown") {
        document.querySelector('.bottom').classList.add("keyboard__key__focus");
        return;
    }
    if (key === 'ArrowRight') {
        document.querySelector('.right').classList.add("keyboard__key__focus");
        return;
    }
    // numbers
    if (key === '1' || key === "!") {
        document.querySelector('.digit1').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '2' || key === "@") {
        document.querySelector('.digit2').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '3' || key === "#") {
        document.querySelector('.digit3').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '4' || key === "$") {
        document.querySelector('.digit4').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '5' || key === "%") {
        document.querySelector('.digit5').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '6' || key === "^") {
        document.querySelector('.digit6').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '7' || key === "&") {
        document.querySelector('.digit7').classList.add("keyboard__key__focus");
        return;
    }
    if (key === "8" || key === "*") {
        document.querySelector('.digit8').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '9' || key === "(") {
        document.querySelector('.digit9').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '0' || key === ")") {
        document.querySelector('.digit0').classList.add("keyboard__key__focus");
        return;
    }
    //special symbols
    if (key === '`' || key === '~') {
        document.querySelector('.backquote').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '-' || key === '_') {
        document.querySelector('.minus').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '=' || key === '+') {
        document.querySelector('.equal').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '[' || key === '{') {
        document.querySelector('.bracketLeft').classList.add("keyboard__key__focus");
        return;
    }
    if (key === ']' || key === '}') {
        document.querySelector('.bracketRight').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '\\' || key === '|') {
        document.querySelector('.backslash').classList.add("keyboard__key__focus");
        return;
    }
    if (key === ';' || key === ':') {
        document.querySelector('.semicolon').classList.add("keyboard__key__focus");
        return;
    }
    if (key === "'" || key === '"') {
        document.querySelector('.quote').classList.add("keyboard__key__focus");
        return;
    }
    if (key === ',' || key === '<') {
        document.querySelector('.comma').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '.' || key === '>') {
        document.querySelector('.period').classList.add("keyboard__key__focus");
        return;
    }
    if (key === '/' || key === '?') {
        document.querySelector('.slash').classList.add("keyboard__key__focus");
        return;
    }
    if (document.querySelector(`.${key}`)) {
        document.querySelector(`.${key}`).classList.add("keyboard__key__focus")
    }
}

const removeBacklightKeyboard = e =>{
    const key = e.key
    // service keys
    if (Keyboard.properties.lang) {
        if (key === ";") {
            document.querySelector('.digit4').classList.remove("keyboard__key__focus");
            return;
        }
        if (key === ":") {
            document.querySelector('.digit6').classList.remove("keyboard__key__focus");
            return;
        }
        if (key === "?") {
            document.querySelector('.digit7').classList.remove("keyboard__key__focus");
            return;
        }
        if (key === '.' || key === ',') {
            document.querySelector('.slash').classList.remove("keyboard__key__focus");
            return;
        }
        if (key === "'" || key === '"') {
            document.querySelector('.digit2').classList.remove("keyboard__key__focus");
            return;
        }
        if (key === "/") {
            document.querySelector('.backslash').classList.remove("keyboard__key__focus");
            return;
        }
    }
    if (key === 'Shift') {
        pressed = true;
        document.querySelector('.shift').classList.remove("keyboard__key__focus");
        Keyboard._toggleShift();
        document.querySelector('.shift').classList.toggle("keyboard__key--active", Keyboard.properties.shift);
        return;
    }
    if (key === ' ') {
        document.querySelector('.space').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === 'Enter') {
        document.querySelector('.enter').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === 'Backspace') {
        document.querySelector('.backspace').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === 'ArrowLeft') {
        document.querySelector('.left').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === 'ArrowUp') {
        document.querySelector('.top').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === "ArrowDown") {
        document.querySelector('.bottom').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === 'ArrowRight') {
        document.querySelector('.right').classList.remove("keyboard__key__focus");
        return;
    }
    // numbers
    if (key === '1' || key === "!") {
        document.querySelector('.digit1').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '2' || key === "@") {
        document.querySelector('.digit2').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '3' || key === "#") {
        document.querySelector('.digit3').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '4' || key === "$") {
        document.querySelector('.digit4').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '5' || key === "%") {
        document.querySelector('.digit5').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '6' || key === "^") {
        document.querySelector('.digit6').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '7' || key === "&") {
        document.querySelector('.digit7').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === "8" || key === "*") {
        document.querySelector('.digit8').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '9' || key === "(") {
        document.querySelector('.digit9').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '0' || key === ")") {
        document.querySelector('.digit0').classList.remove("keyboard__key__focus");
        return;
    }

    //special symbols
    if (key === '`' || key === '~') {
        document.querySelector('.backquote').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '-' || key === '_') {
        document.querySelector('.minus').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '=' || key === '+') {
        document.querySelector('.equal').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '[' || key === '{') {
        document.querySelector('.bracketLeft').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === ']' || key === '}') {
        document.querySelector('.bracketRight').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '\\' || key === '|') {
        document.querySelector('.backslash').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === ';' || key === ':') {
        document.querySelector('.semicolon').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === "'" || key === '"') {
        document.querySelector('.quote').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === ',' || key === '<') {
        document.querySelector('.comma').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '.' || key === '>') {
        document.querySelector('.period').classList.remove("keyboard__key__focus");
        return;
    }
    if (key === '/' || key === '?') {
        document.querySelector('.slash').classList.remove("keyboard__key__focus");
        return;
    }
    if (document.querySelector(`.${key}`)) {
        document.querySelector(`.${key}`).classList.remove("keyboard__key__focus")
    }
}

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

window.addEventListener('keydown', backlightKeyboard)
window.addEventListener('keyup', removeBacklightKeyboard)
openBtn.addEventListener('click', keyBoardOpen);
closeBtn.addEventListener('click', keyBoardClose);
// input.addEventListener('keydown', inputText);
window.addEventListener('keyup', inputText);
