// @ts-nocheck
"use strict"

const BASE_URL = 'http://localhost:8000/';
const getGoodsIiems = `${BASE_URL}catalogData.json`;
const GOODS = `${BASE_URL}goods`;
const BASKETGOODS = `${BASE_URL}basket`;

// Функция получения объекта JSON
function service(url) {
    return fetch(url)
        .then(res => res.json())
}

function serviceWithBody(url = "", method = "POST", body = {}) {
    return fetch(
        url,
        {
            method,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(body)
        }
    ).then(res => res.json())
}

function init() {
    // const vcCustomButton = Vue.component("custom_button", {
    //     template: `
    //         <button>
    //             <slot></slot>
    //         </button>
    //     `
    // });
    
    const vcCustomSearch = Vue.component("custom_search", {
        template: `
            <input
                type="text"
                class="search__input"
                placeholder="Поиск"
                @input="$emit('input', $event.target.value)">
        `
    });

    const vcBasket = Vue.component("vc_basket", {
        data() {
            return {
                basketGoodsItem: []
            }
        },

        template: `
            <div class="basketList">
                <div class="basketListContent">
                    <div class="basketListContentTop">
                        <h2>Корзина</h2>

                        <span
                            class="closeButton"
                            @click="$emit('close')">
                            &times;
                        </span>
                    </div>

                    <div class="basketListContentMain">
                        <vc_basketitems
                            v-for="item in basketGoodsItem"
                            :item="item"
                            @add="addGood">
                        </vc_basketitems>
                    </div>
                </div>
            </div>
        `,

        mounted() {
            service(BASKETGOODS).then(data => {
                this.basketGoodsItem = data
            })
        },

        methods: {
            addGood(id) {
                serviceWithBody(GOODS, "POST", {
                    id
                }).then((data) => {
                    this.basketGoodsItem = data
                })
            }
        }
    });

    const vcGoodItem = Vue.component("vc_gooditems", {
        props: [
            "item"
        ],

        template: `
            <div class="goodsItem">
                <img src="image/defGoods.png"></img>
                <h3>{{ item.product_name }}</h3>
                <p>{{ item.price }} $</p>
                <button 
                    class="cartButtonAdd"
                    @click="addGood">
                    Добавить
                </button>
            </div>
        `,

        methods: {
            addGood() {
                serviceWithBody(GOODS, "POST", {
                    id: this.item.id_product
                })
            }
        }
    });

    const vcBasketItems = Vue.component("vc_basketitems", {
        props: [
            "item"
        ],

        template: `
            <div class="basketItem">
                <p class="basketItem__Name">{{ item.product_name }}</p>
                <p class="basketItem__Price">{{ item.price }}$</p>
                <p class="basketItem__Price">{{ item.count }} шт.</p>
                <button @click="$emit('add', item.id_product)">+</button>
                <button>-</button>
            </div>
        `
    });

    const app = new Vue({
        el: "#root",

        data: {
            list: [],
            searchValue: "",
            basketWindowVisible: false
        },

        methods: {
            basketWindowVisibleChange() {
                this.basketWindowVisible = !this.basketWindowVisible
            }
        },

        mounted() {
            service(getGoodsIiems).then(data => {
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
                    return product_name.match(RegExp(this.searchValue, "gui"))
                })
            }
        }
    });
}

window.onload = init;