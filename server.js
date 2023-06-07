const express = require('express');
const app = express();
const PORT = 2121;
require('dotenv').config();

let MongoUserPassword = process.env.MongoUserPassword

const MongoClient = require('mongodb').MongoClient;
let db;


MongoClient.connect(`${MongoUserPassword}`, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    db = client.db('Project-0');
  })
  .catch(error => console.error(error));

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());

    

  app.get('/', (request, response) => {
    db.collection('quotes').find().toArray()
      .then(results => {
        console.log(results)
        response.render('index.ejs', {quotes: results})
      })
      .catch(error => console.error(error))      
  });

    app.post('/quotes', (request, response) =>{
      db.collection('quotes').insertOne({word: request.body.word, definition: request.body.definition})
        .then(result => {
          response.redirect('/');
        })
        .catch(error => console.error(error))
    });

  //   app.put('/addOneLike', (request, response) => {
  //     quotesCollection.updateOne({word: request.body.wordS, definition: request.body.definitionS},{
  //         $set: {
  //             likes:request.body.likesS + 1
  //           }
  //     },{
  //         sort: {_id: -1},
  //         upsert: true
  //     })
  //     .then(result => {
  //         console.log('Added One Like')
  //         response.json('Like Added')
  //     })
  //     .catch(error => console.error(error))
  // })

    app.delete('/deleteWord', (request, response) =>{
      db.collection('quotes').deleteOne({word: request.body.wordS})
      .then(result => {
        console.log('Word Deleted')
        response.json('Word Deleted')
      })
      .catch(error => console.error(error))
    });

    app.listen(process.env.PORT || PORT, ()=>{
      console.log(`Server running on port ${PORT}`)
    });


  







