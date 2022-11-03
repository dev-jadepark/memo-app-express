const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");

const memos = [];

app.use(bodyParser.json());

app.get('/api/memos', (req, res) => {
  res.send(memos)
});

app.post('/api/memos', (req, res) => {
  console.log(req.body);
  memos.push(req.body.content);
  res.send(memos);
});

app.put('/api/memos/:idx', (req, res) => {
  console.log(req.params.idx);
  console.log(req.body);
  memos[req.params.idx] = req.body.content;
  res.send(memos);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


/** https://jojoldu.tistory.com/634 */
const { Pool } = require("pg");
const e = require('express');
const dbClient = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres1234",
    port: 5432,
    max: 5,
    connectionTimeoutMillis: 30000,
});

dbClient.connect(err => {
  if(err) {
    console.log('connection error!' + err);
  }else {
    console.log('connection completed!');
  }
});


app.get("/api/now", (req, res) => {
  dbClient.query("SELECT NOW()", (error, result) => {
      if(error) {
          res.sendStatus(500);
      } else {
          res.status(200).json(result.rows);
      }
  });    
});



// const pg = require('pg');

// const config = {
//     host: 'localhost',
//     // Do not hard code your username and password.
//     // Consider using Node environment variables.
//     user: 'postgres',     
//     password: 'postgres1234',
//     database: 'postgres',
//     port: 5432,
//     ssl: false
// };

// const client = new pg.Client(config);

// client.connect(err => {
//     if (err) throw err;
//     else {
//         queryDatabase();
//     }
// });

// function queryDatabase() {
//     const query = `
//         DROP TABLE IF EXISTS inventory;
//         CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
//         INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
//         INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
//         INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
//     `;

//     client
//         .query(query)
//         .then(() => {
//             console.log('Table created successfully!');
//             client.end(console.log('Closed client connection'));
//         })
//         .catch(err => console.log(err))
//         .then(() => {
//             console.log('Finished execution, exiting now');
//             //process.exit();
//         });
// }
