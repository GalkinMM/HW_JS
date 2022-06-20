import { writeFile, readFile } from "fs/promises";
import express from "express";
import cors from "cors";

const BASKET_PATH = './public/getBasket.json'
const GOODS_PATH = './public/catalogData.json'

function getBasket() {
    return readFile(BASKET_PATH, 'utf-8').then(file => JSON.parse(file));
}

function getGoods() {
    return readFile(GOODS_PATH, 'utf-8').then(file => JSON.parse(file));
}

function getReformBasket() {
    return Promise.all([
        getGoods(),
        getBasket()
    ]).then(([goods, basket]) => {
        const result = basket.map(basketGood => {
            const { id_product: _basketId } = basketGood;
            const good =  goods.find(({ id_product: _goodsId }) => 
                _goodsId === _basketId);
            return {
                ...basketGood,
                ...good
            }
        });
        return result
    })
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/goods', (res, req) => {
    getBasket().then(basket => {
        const basketItem = basket.find(({ id_product: _id }) => 
            _id === res.body.id);
        if (!basketItem) {
            basket.push({
                id_product: res.body.id,
                count: 1
            });
        } else {
            basket = basket.map(basketItem => {
                if (basketItem.id_product === res.body.id) {
                    return {
                        ...basketItem,
                        count: basketItem.count + 1
                    }
                } else {
                    return basketItem
                }
            })
        };
        return writeFile(BASKET_PATH, JSON.stringify(basket)).then(() => {
            return getReformBasket()
        }).then(result => {
            req.send(result)
        })
    })
})

app.get('/basket', (res, req) => {
    getReformBasket().then(result => {
        req.send(JSON.stringify(result))
    })
});

app.listen('8000', () => console.log('server is starting!!!'));