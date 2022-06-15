import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public');)
app.use(cors());

app.get('/', (req, res) => {
    console.log('request body - \n', req.body);
});

app.listen('8000', () => {
    console.log('server is starting!!!');
});