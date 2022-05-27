"use strict";

// const goods = [
//     { title: 'Shirt', price: 150 },
//     { title: 'Socks', price: 50 },
//     { title: 'Jacket', price: 350 },
//     { title: 'Shoes', price: 250 },
//     { title: 'Shirt', price: 150 },
//     { title: 'Socks', price: 50 },
//     { title: 'Jacket', price: 350 },
//     { title: 'Shoes', price: 250 },
//     { title: 'Shirt', price: 150 },
//     { title: 'Socks', price: 50 },
//     { title: 'Jacket', price: 350 },
//     { title: 'Shoes', price: 250 },
// ];

const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = `${BASE_URL}/catalogData.json`;
const BASKETGOODS = `${BASE_URL}/getBasket.json`;

function service(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    const loadHandler = () => {
        callback(JSON.parse(xhr.response));
    }
    xhr.onload = loadHandler;

    xhr.send();
}

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
    fetchData(callback) {
        service(GOODS, (data) => {
            this.list = data;
            callback();
        });
        
    };

    getCount() {
        return this.list.reduce((prev, { price }) => prev + price, 0);
    };

    render() {
        const goodsList = this.list.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        }).join('');

        document.querySelector('.goodsList').innerHTML = goodsList;
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
    console.log(basketList);
});




