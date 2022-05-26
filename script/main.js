"use strict";

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

class GoodsItem {
    constructor({ title = 'Товар закончился', price = 0 }) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `
            <div class='goodsItem'>
                <img src='image/defGoods.png' alt='good'>
                <h3>${this.title}</h3>
                <p>${this.price}$</p>
                <button class="cartButtonAdd" type="button">Добавить</button>
            </div>
        `
    }
}

class GoodsList {
    fetchData() {
        this.list = goods;
    }

    getCount() {
        console.log(this.list);
        return this.list.reduce((sum, { price }) => {
            return sum + +price;
        }, 0);
    }

    render() {
        const goodsList = this.list.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        }).join('');

        document.querySelector('.goodsList').innerHTML = goodsList;
    }
}

const goodsList = new GoodsList(goods);
goodsList.fetchData();
goodsList.render();
console.log(`Сумма цен всех товаров = ${goodsList.getCount()}`);




