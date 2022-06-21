// @ts-nocheck
export default Vue.component("vc_gooditems", {
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