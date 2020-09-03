const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

let Activecard = 0;
const cardsarr = [];
const cardsDate = huoqucardsData();

function tianjiacards() {
    cardsDate.forEach((data, index) => tianjiacard(data, index));
}

function tianjiacard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    if (index === 0) {
        card.classList.add('active');
    }
    card.innerHTML = `
<div class="inner-card">
    <div class="inner-card-front">
    <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
    <p>${data.answer}</p>
    </div>
</div>
    `;
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    cardsarr.push(card);
    cardsContainer.appendChild(card);
    gaibiancurrentText();
}

function gaibiancurrentText() {
    currentEl.innerText = `${Activecard + 1}/${cardsarr.length}`;
}

function huoqucardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function chucuncardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}
tianjiacards();
nextBtn.addEventListener('click', () => {
    cardsarr[Activecard].className = "card left";
    Activecard = Activecard + 1;
    if (Activecard > cardsarr.length - 1) {
        Activecard = cardsarr.length - 1;
    }
    cardsarr[Activecard].className = "card active";
    gaibiancurrentText();
});
prevBtn.addEventListener('click', () => {
    cardsarr[Activecard].className = "card right";
    Activecard = Activecard - 1;
    if (Activecard < 0) {
        Activecard = 0;
    }
    cardsarr[Activecard].className = "card active";
    gaibiancurrentText();
});
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = "";
    window.location.reload();
});
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    if (question.trim() && answer.trim()) {
        const newcard = { question, answer };
        tianjiacard(newcard);
        questionEl.value = "";
        answerEl.value = "";
        addContainer.classList.remove('show');
        cardsDate.push(newcard);
        chucuncardsData(cardsDate);
    }
});