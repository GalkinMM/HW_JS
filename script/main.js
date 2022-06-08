// @ts-nocheck


const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = `${BASE_URL}/catalogData.json`;
const BASKETGOODS = `${BASE_URL}/getBasket.json`;

function service(url) {
    return fetch(url).then(res => res.json())
}

window.onload = () => {
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

    Vue.component("rte", {
        template: '
            
        '
    })
}