// @ts-nocheck
"use strict"

import "../style/style.css";

import { BASE_URL, getGoodsIiems, GOODS, BASKETGOODS } from "../constances";

import {service, serviceWithBody} from "../services"

import "../components/customSearch";
import "../components/basketItems";
// import "../components/goodItem";
// import "../components/basket";

Vue.component("vc_gooditems", {
    props: [
        "item"
    ],

    template: `
        <div class="goodsItem">
            <img src='../image/defGoods.png'></img>
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
            serviceWithBody(BASKETGOODS, "POST", {
                id: this.item.id_product
            })
        }
    }
});

Vue.component("vc_basket", {
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
                        @add="addGood"
                        @del="delGood">
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
            serviceWithBody(BASKETGOODS, "POST", {
                id
            }).then((data) => {
                this.basketGoodsItem = data
            })
        },
        delGood(id) {
            serviceWithBody(BASKETGOODS, "DELETE", {
                id
            }).then((data) => {
                this.basketGoodsItem = data
            })
        }
    }
});

function init() {
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