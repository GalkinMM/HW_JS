"use strict";

const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = `${BASE_URL}/catalogData.json`;
const BASKETGOODS = `${BASE_URL}/getBasket.json`;

function service(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        callback(JSON.parse(xhr.response));
    };
    xhr.send();
};

class GoodsItem {
    constructor({ product_name = 'Товар закончился', price = 0 }) {
        this.title = product_name;
        this.price = price;
    };

    render() {
        return `
            <div class='goodsItem'>
                <img src='image/defGoods.png' alt='good'>
                <h3>${this.title}</h3>
                <p>${this.price}$</p>
                <button class="cartButtonAdd" type="button">Добавить</button>
            </div>
        `
    };
};

class GoodsList {
    list = [];
    filteredList = [];

    fetchData(callback) {
        service(GOODS, (data) => {
            this.list = data;
            this.filteredList = data;
            callback();
        });
    };

    getCount() {
        return this.list.reduce((prev, { price }) => prev + price, 0);
    };

    render() {
        const goodsList = this.filteredList.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        }).join('');

        document.querySelector('.goodsList').innerHTML = goodsList;
    };

    filter(str) {
        this.filteredList = this.list.filter(({ product_name }) => {
            return (new RegExp(str, 'i')).test(product_name);
        });
    };
};

const goodsList = new GoodsList();
goodsList.fetchData(() => {
    goodsList.render();
    console.log(`Сумма цен всех товаров = ${goodsList.getCount()}`);
});

class BasketList {
    list = [];
    fetchData(callback) {
        service(BASKETGOODS, (data) => {
            this.list = data.contents;
            callback();
        });
    };

    render() {
        const basketList = this.list.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        }).join('');
    };
};

const basketList = new BasketList();
basketList.fetchData(() => {
    basketList.render();
    console.log(basketList); //Вывод содержимого корзины
});

document.getElementsByClassName('search__button')[0].addEventListener('click', () => {
    const inpSearch = document.getElementsByClassName('search__input')[0];
    goodsList.filter(inpSearch.value);
    goodsList.render();
});




