// @ts-nocheck
export default Vue.component("custom_search", {
    template: `
        <input
            type="text"
            class="search__input"
            placeholder="Поиск"
            @input="$emit('input', $event.target.value)">
    `
});