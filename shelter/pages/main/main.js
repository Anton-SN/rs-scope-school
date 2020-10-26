const cards = document.querySelectorAll('.card');
const overlayPopup = document.querySelector('.overlayPopup');
const popupAdd = document.querySelector('.main__pets');

const showPopup = e => {
    let { path } = e
    const classCard = path.map(e =>e.className)
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
        )[0]
    const name = classCard.split(' ').filter(e =>
        e !== 'card' &&
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
    overlayPopup.style.display = 'block';
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

const closePopup = () => {
    const popup = document.querySelector('.popup');
    overlayPopup.style.display = 'none';
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
    popup.parentNode.removeChild(popup)
}

cards.forEach(elem => elem.addEventListener('click', showPopup))
overlayPopup.addEventListener('mouseover', hoverToPopup);
overlayPopup.addEventListener('mouseout', deleteHoverToPopup);
overlayPopup.addEventListener('click', closePopup);
