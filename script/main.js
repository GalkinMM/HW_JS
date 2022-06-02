"use strict";

const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = `${BASE_URL}/catalogData.json`;
const BASKETGOODS = `${BASE_URL}/getBasket.json`;

function service(url) {
    return fetch(url).then(res => res.json())
}