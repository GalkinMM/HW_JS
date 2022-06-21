// @ts-nocheck
export default Vue.component("vc_basket", {
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