const openBtn = document.querySelector('.open-keyboard')
const closeBtn = document.querySelector('.close-keyboard')
const input = document.querySelector('.use-keyboard-input')

const keyLayout = {
    eng:
        [
            "`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[", "]" , "\\",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "ru",
            "space", 'left', 'top', 'bottom', 'right'
        ],
    engShift:
        [
            "~","!", "@", "#", "$", "%", "%", "^", "*", "(", ")", "_", "+", "backspace",
            "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P","{", "}" , "|",
            "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "enter",
            "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "ru",
            "space", 'left', 'top', 'bottom', 'right'
        ],
    rus:
        [
            "ё","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж", "э", "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "ru",
            "space", 'left', 'top', 'bottom', 'right'
        ],
    rusShift:
        [
            "Ё","!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
            "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/",
            "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д","Ж", "Э", "enter",
            "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "ru",
            "space", 'left', 'top', 'bottom', 'right'
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

        // Automatically use keyboard for elements with .use-keyboard-input
        // document.querySelectorAll(".use-keyboard-input").forEach(element => {
        //     element.addEventListener("focus", () => {
        //         this.open(element.value, currentValue => {
        //             element.value = currentValue;
        //         });
        //     });
        // });
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

        keyLayout[this.properties.lang ? 'rus' : 'eng'].forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "\\", "enter", "ru", "en"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
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
                        };
                        input.selectionStart = begin + dop;
                        input.selectionEnd = begin + dop;
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
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                case "ru":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable")

                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        keyElement.classList.toggle("keyboard__key--active", !this.properties.lang);
                        const start = input.selectionStart;
                        input.focus();
                        input.selectionStart = start;
                        input.selectionEnd = start;
                        this._toggleLang()
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

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
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
            this.elements.keys.forEach((e, i) => {
                const caps = this.properties.capsLock;
                if (keyLayout[keyLang][i].length <= 2) {

                    if (caps) {
                        e.textContent = keyLayout[keyLang][i].toUpperCase();
                        return;
                    }
                    e.textContent = keyLayout[keyLang][i]
                }
            })
        }
        else
        {
            this.properties.lang = !this.properties.lang;
            this.elements.keys.forEach((e, i) => {
                const lang = this.properties.lang ? "rus" : "eng";
                const caps = this.properties.capsLock;
                const shift = this.properties.shift;
                if (keyLayout[lang][i].length <= 2) {
                    if (shift) {
                        e.textContent = keyLayout[lang + 'Shift'][i].toUpperCase();
                        return;
                    }
                    if (caps) {
                        e.textContent = keyLayout[lang][i].toUpperCase();
                        return;
                    }
                    e.textContent = keyLayout[lang][i]
                }
            })
        }
    },

    open(initialValue, oninput, onclose) {
        console.log(initialValue)
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

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

const keyBoardOpen = () => {
    const initialValue = input.value;
    console.log(initialValue)
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
    const value = e.target.value;
    if (value[value.length - 1] !== undefined && value[value.length - 1].charCodeAt(0) > 200) Keyboard._toggleLang("rus")
    if (value[value.length - 1].charCodeAt(0) < 200) Keyboard._toggleLang("eng")
    Keyboard.properties.value = input.value;
}

openBtn.addEventListener('click', keyBoardOpen);
closeBtn.addEventListener('click', keyBoardClose);
// input.addEventListener('keydown', inputText);
input.addEventListener('keyup', inputText);
