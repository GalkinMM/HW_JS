// @ts-nocheck
"use strict"

// const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const BASE_URL = 'http://localhost:8000/';
const GOODS = `${BASE_URL}catalogData.json`;
const BASKETGOODS = `${BASE_URL}getBasket.json`;

function service(url) {
    return fetch(url).then(res => res.json())
}

function init() {
    Vue.component('custom_search', {
        template:`
        <input  type="text" class="search__input" placeholder="Поиск"
                @input="$emit('input', $event.target.value)">
        `
    });

    Vue.component('vc_basket', {
        template: `
        <div class="basketList">
            <div class="basketListContent">
                <div class="basketListContentTop">
                    <h2>Корзина {{ getCount }}</h2>

                    <span   class="closeButton"
                            @click="$emit('close')">
                            &times;
                    </span>
                </div>

                <div class="basketListContentMain">
                    Здесь будут товары
                </div>
            </div>
        </div>
        `
    });

    Vue.component('vc_gooditems', {
        props: [
            'item'
        ],

        template: `
            <div class='goodsItem'>
                <img src='image/defGoods.png' alt='good'></img>
                <h3>{{ item.product_name }}</h3>
                <p>{{ item.price }} $</p>
                <button class='cartButtonAdd' type='button'>Добавить</button>
            </div>
        `
    });

    const app = new Vue({
        el: '#root',

        data: {
            list: [],
            searchValue: '',
            basketWindowVisible: false
        },

        methods: {
            basketWindowVisibleChange() {
                this.basketWindowVisible = !this.basketWindowVisible
            }
        },

        mounted() {
            service(GOODS).then(data => {
                this.list = data;
                return data
            })
        },

        computed: {
            getCount() {
                return this.list.reduce((prev, { price }) => prev + price, 0)
            },

            filteredList() {
                return this.list.filter(({ product_name }) => {
                    return product_name.match(RegExp(this.searchValue, 'gui'))
                })
            },
        }
    });
}

window.onload = init;