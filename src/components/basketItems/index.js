// @ts-nocheck
export default Vue.component("vc_basketitems", {
    props: [
        "item"
    ],

    template: `
        <div class="basketItem">
            <p class="basketItem__Name">{{ item.product_name }}</p>
            <p class="basketItem__Price">{{ item.price }}$</p>
            <p class="basketItem__Price">{{ item.count }} шт.</p>
            <button @click="$emit('add', item.id_product)">+</button>
            <button @click="$emit('del', item.id_product)">-</button>
        </div>
    `
});