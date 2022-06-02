window.onload = () => {
    const app = new Vue({
        el: '#root',

        data: {
            list: [{product_name: 'Товары не загрузились',
                    price: 0}],
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
    })
}