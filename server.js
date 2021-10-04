const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const score = require('./controllers/score');

const db = knex({
  client: 'pg',
   version: '13.4',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Success');
  console.log('working')
})

app.post('/score', (req, res) => { score.handleScore(req, res, db) });
app.post('/scoreadd', (req, res) => { score.updateScore(req, res, db) });
app.post('/scoredelete', (req, res) => { score.deleteScore(req, res, db) });

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`)
});