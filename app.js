const express = require('express');
const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost/BookAPI');
const Book = require('./models/bookModel');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const bookRouter = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter.route('/Books')
    .post((req, res)=>{
        const book = new Book()
        console.log(book);
        res.send(book);
    })
    .get((req, res)=>{
        const query = {}
        if (req.query.genre){
            query.genre = req.query.genre
        }

        Book.find(query, (err, books)=>{
            if(err) {res.status(500).send(err)}
            else res.json(books)
        })
    })


app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('welcome to the books api')
});

app.listen(port, function (){
    console.log('listening on ' + port)
});
