const overlayPopup = document.querySelector('.overlayPopup');
const popupAdd = document.querySelector('.main__pets');

const pets__cards = document.querySelector('.pets__cards');
const fullLeft = document.querySelector('.fillLeft')
const left = document.querySelector('.left')
const pagination = document.querySelector('.pagination')
const right = document.querySelector('.right')
const fullRight = document.querySelector('.fullRight')
let currentPets;
let i = 1;
let iMax;

const showPopup = e => {
    let { path } = e
    const classCard = path.map(e => e.className)
        .filter(e =>
            e !== '' &&
            e !== 'card__wrap' &&
            e !== undefined &&
            e !== 'card' &&
            e !== 'pets' &&
            e !== 'main__pets' &&
            e !== 'pets__cards' &&
            e !== 'main' &&
            e !== 'card__btn'
        )[0];
    const name = classCard.split(' ').filter(e =>
        e !== 'card' &&
        e !== 'card__wrap' &&
        e !== 'displayNone' &&
        e !== 'displayNone2')[0]
    const petsPopup = pets.filter(e => e.name === name)[0]
    const {
        name: petsName,
        img,
        type,
        breed,
        description,
    } = petsPopup
    const others = ['Age', 'Inoculations', 'Diseases', 'Parasites']
    // Create Elem
    const popup = document.createElement('div')
    popup.classList.add('popup');

    const popupInfo = document.createElement('div');
    const popupClose = document.createElement('button')
    const popupClose__img = document.createElement('img');
    popupInfo.classList.add('popupInfo');
    popupClose.classList.add('popupClose');
    popupClose__img.setAttribute('src', '../../assets/icons/vector.svg');
    popupClose__img.setAttribute('alt', 'delete');
    popupClose.append(popupClose__img);
    popupClose.addEventListener('click', closePopup)

    const popupInfo__wrap = document.createElement('div');
    const popupWrap__img = document.createElement('img');
    const popupInfo__infoPets = document.createElement('div');
    popupInfo__wrap.classList.add('popupInfo__wrap');
    popupInfo__infoPets.classList.add('popupInfo__infoPets');
    popupWrap__img.setAttribute('src', img)
    popupWrap__img.setAttribute('alt', petsName)
    popupInfo__wrap.append(popupWrap__img)

    const pets__name = document.createElement('h3');
    const pets__type = document.createElement('h4');
    const pets__description = document.createElement('h5');
    pets__name.classList.add('pets__name');
    pets__type.classList.add('pets__type');
    pets__description.classList.add('pets__description');
    pets__name.innerHTML = petsName;
    pets__type.innerHTML = `${type} - ${breed}`;
    pets__description.innerHTML = description;

    const pets__parameters = document.createElement('ul');
    const list = others.map(e => {
        const li = document.createElement('li')
        const h5 = document.createElement('h5')
        const span = document.createElement('span')
        const value = petsPopup[e.toLowerCase()];
        span.innerHTML = `${e}: `
        if (typeof value === 'string') h5.innerHTML += value
        else h5.innerHTML += petsPopup[e.toLowerCase()].join(', ')
        h5.prepend(span);
        li.prepend(h5);
        return li
    });
    const ul = list.reduce((acc, e) => {
        acc.append(e)
        return acc
    }, pets__parameters)
    ul.classList.add('pets__parameters');

    popupInfo__infoPets.append(pets__name);
    popupInfo__infoPets.append(pets__type);
    popupInfo__infoPets.append(pets__description);
    popupInfo__infoPets.append(ul);

    popupInfo.append(popupInfo__wrap);
    popupInfo.append(popupInfo__infoPets);
    popup.append(popupInfo);
    popup.append(popupClose);
    popupAdd.append(popup);
    const y = window.scrollY;
    overlayPopup.style.display = 'block';
    popup.style.top = y + 'px';
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

const hoverToPopup = () => {
    const close = document.querySelector('.popupClose');
    close.classList.add('popupClose__hover')
}

const deleteHoverToPopup = () => {
    const close = document.querySelector('.popupClose');
    close.classList.remove('popupClose__hover')
}

const closePopup = e => {
    const popup = document.querySelector('.popup');
    overlayPopup.style.display = 'none';
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
    popup.parentNode.removeChild(popup)
}

const generatePets = (array) => {
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
        array.length;
        return array;
    }
    currentPets = [...shuffle(pets), ...shuffle(pets), ...shuffle(pets), ...shuffle(pets), ...shuffle(pets), ...shuffle(pets)]
        .map(({ img, name })=> ({ img, name}));

    const domPets = currentPets.map(({img, name}) => {
        const card = document.createElement('div');
        const card__wrap = document.createElement('div');
        const card__img = document.createElement('img');
        card.classList.add('card');
        card.classList.add(name);
        card__wrap.classList.add('card__wrap');
        card__img.setAttribute('src', img)
        card__img.setAttribute('alt', name)

        const card__title = document.createElement('h4');
        const card__btn = document.createElement('button');
        card__title.innerHTML = name;
        card__btn.innerHTML = 'Learn more';
        card__btn.classList.add('card__btn');
        card__title.classList.add('card__title');

        card__wrap.append(card__img);
        card.append(card__wrap);
        card.append(card__title);
        card.append(card__btn);
        card.addEventListener('click', showPopup)
        return card;
    })

    const container= document.createElement('div');
    container.classList.add("cardContainer");
    const list = domPets.reduce((acc, e) => {
        acc.append(e)
        return acc
    }, container)
    pets__cards.append(container)

    fullLeft.classList.add('inactive');
    left.classList.add('inactive');
}

const changeStatusButton = (max) => {
    if (+i === +max) {
        fullRight.classList.add('inactive')
        right.classList.add('inactive')
        left.classList.remove('inactive')
        fullLeft.classList.remove('inactive')
        return;
    }
    if (+i === 1) {
        fullRight.classList.remove('inactive')
        right.classList.remove('inactive')
        left.classList.add('inactive')
        fullLeft.classList.add('inactive')
        return;
    }
    fullRight.classList.remove('inactive')
    right.classList.remove('inactive')
    left.classList.remove('inactive')
    fullLeft.classList.remove('inactive')
    return null;
}

const paginationAction = e => {
    const windowInnerWidth = window.innerWidth;
    const value = e === undefined ? null : e.target.value;
    const className = e === undefined ? '423432' : e.target.className;
    const container = document.querySelector('.cardContainer');
    const length = currentPets.length;
    fullRight.classList.add('inactive')
    right.classList.add('inactive')
    let n, c
    if (768 > windowInnerWidth) {
        c = 3
        n = 3
    }
    if (windowInnerWidth >= 768 && windowInnerWidth < 1280) {
        c = 3
        n = 6
    }
    if (windowInnerWidth >= 1280) {
        c = 2
        n = 8
    }
    if ( className.indexOf('inactive') !== -1) return;
    iMax = length/n
    switch (value) {
        case '1':
            i = 1;
            pagination.innerHTML = i;
            container.style.top = `-${465 * c * (2 - 1)}px`
            changeStatusButton(iMax);
            return;
        case '2':
            i += -1
            pagination.innerHTML = i;
            container.style.top = `-${465 * c * (i - 1)}px`
            changeStatusButton(iMax);
            return;
        case '3':
            i += 1
            pagination.innerHTML = i;
            container.style.top = `-${465 * c * (i - 1)}px`
            changeStatusButton(iMax);
            return;
        case '4':
            i = iMax;
            pagination.innerHTML = i;
            container.style.top = `-${465 * c * (iMax - 1)}px`
            changeStatusButton(iMax);
            return;
        default:
            changeStatusButton(iMax);
            return;
    }
}

overlayPopup.addEventListener('mouseover', hoverToPopup);
overlayPopup.addEventListener('mouseout', deleteHoverToPopup);
overlayPopup.addEventListener('click', closePopup);

fullLeft.addEventListener('click', paginationAction);
left.addEventListener('click', paginationAction);
right.addEventListener('click', paginationAction);
fullRight.addEventListener('click', paginationAction);
window.addEventListener('resize', () => {
    const cardContainer = document.querySelector('.cardContainer')
    cardContainer.parentNode.removeChild(cardContainer)
    generatePets()
    paginationAction()
}, false)

generatePets()
paginationAction()