//cоздаю и возвращаю форму для начала игры
function createFormToStart() {
    const starting = document.createElement('div');
    const rules = document.createElement('p');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonStart = document.createElement('button');

    rules.innerHTML = 'ПРАВИЛА: Открывайте карточки по очереди, чтобы найти все пары чисел. <br>  <br>  <br> Для начала игры задайте количество карточек по вертикали/горизонтали.';
    form.classList.add('input-group');
    input.classList.add('form-control');
    input.placeholder = 'Введите чётное число от 2 до 10';
    buttonStart.classList.add('btn', 'btn-primary');
    buttonStart.textContent = 'Начать игру';

    starting.append(rules);
    starting.append(form);
    form.append(input);
    form.append(buttonStart);

    return {
        starting, form, input, buttonStart,
    };
}

//заполняю массив номерами для карточек
function cardNumbers(side) {
    let arrayOfNumbers = [];
    let halfOfField = ((side * side) / 2);

    for (double = 1; double <= 2; double++) {
        for (number = 1; number <= halfOfField; number++) {
            arrayOfNumbers.push(number);
        };
    };
    //перемешиваю номера карточек
    for (let i = arrayOfNumbers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arrayOfNumbers[i], arrayOfNumbers[j]] = [arrayOfNumbers[j], arrayOfNumbers[i]];
    }

    return arrayOfNumbers;
}

//cоздаю и возвращаю элементы для карточки
function createCard() {
    const turn = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');

    turn.classList.add('turn');
    front.classList.add('front');
    back.classList.add('back');

    turn.style.border = '3px solid white';
    front.style.height = '150px';
    front.style.backgroundColor = '#00acc1';
    back.style.paddingTop = '35px';
    back.style.height = '150px';
    back.style.textAlign = 'center';
    back.style.fontSize = '48px';
    back.style.backgroundColor = '#b2ebf2';
    back.style.display = 'none';

    turn.append(front);
    turn.append(back);

    document.querySelector('.row').append(turn);

    return {
        turn, front, back,
    };
}

//играем!
function gameOfPairs() {
    const start = createFormToStart();
    document.querySelector('.container').append(start.starting);

    start.form.addEventListener('submit', function (e) {
        e.preventDefault();

        let numberOfInput = Number(start.input.value);
        if ((numberOfInput !== 2) && (numberOfInput !== 4) && (numberOfInput !== 6) && (numberOfInput !== 8) && (numberOfInput !== 10)) {
            alert('Неверное значение. Построено поле 4*4.');
            numberOfInput = 4;
        };

        let cardNumb = cardNumbers(numberOfInput);
        console.log(cardNumb);

        start.starting.remove();

        for (num of cardNumb) {
            let card = createCard();

            if (numberOfInput === 2) { card.turn.classList.add('col-6'); };
            if (numberOfInput === 4) { card.turn.classList.add('col-3'); };
            if (numberOfInput === 6) { card.turn.classList.add('col-2'); };
            if (numberOfInput === 8) {
                card.turn.classList.add('col-2');
                card.turn.style.width = '11.666667%'
            };
            if (numberOfInput === 10) {
                card.turn.classList.add('col-1');
                card.turn.style.width = '9.333333%'
            };

            card.back.textContent = num;

            card.front.addEventListener('click', () => {
                card.front.style.display = 'none';
                card.back.style.display = 'block';

                card.front.classList.add('animate__animated', 'animate__flipInY');
                card.back.classList.add('animate__animated', 'animate__flipInY');

                card.back.classList.add('active');
                let active = document.querySelectorAll('.active');
                if (active.length === 2) {
                    if (active[0].textContent !== active[1].textContent) {
                        setTimeout(() => {
                            let one = active[0].parentNode;
                            let two = active[1].parentNode;
                            one.children[0].style.display = 'block';
                            one.children[1].style.display = 'none';
                            two.children[0].style.display = 'block';
                            two.children[1].style.display = 'none';
                        }, 1000)
                        console.log('Ищите дальше');
                    }
                    else if (active[0].textContent === active[1].textContent) {
                        console.log(`Найдена пара ${active[0].textContent}`);
                        card.back.classList.add('open');
                        let open = document.querySelectorAll('.open');
                        if (open.length === (numberOfInput * numberOfInput / 2)) {
                            alert('Поздравляем! Все пары найдены!');
                            console.log('Поздравляем! Все пары найдены!');

                            const button = document.createElement('button');
                            button.classList.add('btn', 'btn-primary');
                            button.style.display = 'flex';
                            button.style.margin = '30px auto 0 auto';
                            button.textContent = 'Сыграть еще раз?';
                            document.querySelector('.container').append(button);

                            button.addEventListener('click', () => {
                                let allCards = document.querySelectorAll('.turn');
                                for (thing of allCards) {
                                    thing.remove();
                                }
                                button.remove();
                                gameOfPairs();
                            });
                        };
                    };
                    for (i of active) {
                        i.classList.remove('active');
                    };
                };
            });
        };
    });
}

document.addEventListener('DOMContentLoaded', () => {
    gameOfPairs();
})