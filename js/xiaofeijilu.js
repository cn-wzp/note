const balance = document.getElementById('balance');
const plus = document.getElementById('money-plus');
const minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const bendichucun = JSON.parse(localStorage.getItem('transactions'));
let xiaofeis = localStorage.getItem('transactions') !== null ? bendichucun : [];

function ID() {
    return Math.floor(Math.random() * 1000000000);
}

function yichuchucun(id) {
    xiaofeis = xiaofeis.filter(xiaofei => xiaofei.id !== id);
    updatechucun();
    init();
}

function updatechucun() {
    localStorage.setItem('transactions', JSON.stringify(xiaofeis));
}

function init() {
    list.innerHTML = '';

    xiaofeis.forEach(jiluxiaofei);
    updateshujv();
}

function jiluxiaofei(xiaofei) {
    const zhengfu = xiaofei.amount < 0 ? '-' : '+';
    const chuangjian = document.createElement('li');
    chuangjian.classList.add(xiaofei.amount < 0 ? 'minus' : 'plus');
    chuangjian.innerHTML = `${xiaofei.text}
    <span>${zhengfu}${Math.abs(xiaofei.amount)}
    </span>
    <button class="delete-btn"
    onclick="yichuchucun(${xiaofei.id})">x</button>`;
    list.appendChild(chuangjian);
}

function tianjia(e) {
    e.preventDefault();
    if (text.value.trim() === " " || amount.value.trim() === " ") {
        alert("请输入事件和金额");
    } else {
        const xiaofei = {
            id: ID(),
            text: text.value,
            amount: +amount.value
        };
        xiaofeis.push(xiaofei);
        jiluxiaofei(xiaofei);
        updateshujv();
        updatechucun();
        text.value = "";
        amount.value = "";
    }
}

function updateshujv() {
    const amountarr = xiaofeis.map(xiaofei => xiaofei.amount);
    const total = amountarr.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const shouru = amountarr.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const zhichu = (amountarr.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    balance.innerText = `$${total}`;
    plus.innerText = `$${shouru}`;
    minus.innerText = `$${zhichu}`;
}
init();
form.addEventListener('submit', tianjia);