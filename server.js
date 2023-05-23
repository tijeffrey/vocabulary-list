const express = require('express');
const app = express();
const PORT = 2121;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect(, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('Project-0');

    app.use(bodyParser.urlencoded({extended: true}));
    
    app.get('/', (request, respond) => {
      respond.sendFile(__dirname + '/index.html')
    });

    app.post('/quotes', (request, response) =>{
      console.log(request.body)
    });

    app.listen(process.env.PORT || PORT, ()=>{
      console.log(`Server running on port ${PORT}`)
    });
  })
  .catch(error => console.error(error))
  .finally(() => {
    console.log('Win or lose; keep working hard!');
  });
  







