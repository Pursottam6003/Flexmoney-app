const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const { findUserByToken, SECRET } = require('../helpers/helper');
const jwt = require('jsonwebtoken');
const expiresInMin = 60;

const getDb = require('../db/conn').getDb;

function generateRandomInteger(length) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
users.route('/users/register').post((req, res) => {
  const db = getDb();
  const { email, password, confirmPassword } = req.body;
  console.log('Signing up: ', req.body);

  if (password !== confirmPassword) {
    res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    })
  } else {
    // check if email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ message: 'Invalid API usage' });
      }
      // email already exists
      if (results.length > 0) {
        return res.status(400).send({ message: 'Email already exists' });
      }

      // hash user password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.log(err);
          return res.status(400).send({ message: 'Invalid API usage' });
        }

        // const insertQuery = "INSERT INTO users (id, email, password) VALUES (UNHEX(REPLACE(UUID(),'-','')), ?, ?)";
        const randomId = generateRandomInteger(10);
        const randIdtext = generateRandomInteger(10);
        const insertQuery = "INSERT INTO users (id,id_text,email,password) VALUES ('" + randomId + "','" + randIdtext + "',?,?)";
        db.query(insertQuery, [email, hashedPassword], (err, result) => {
          if (err) throw err;
          console.log(result);

          res.status(200).json({
            success: true,
            message: 'User registered'
          });
        });
      });
    });
  }
})

users.route('/users/login').post((req, res) => {
  // get json web token from request cookies
  const token = req.cookies.auth;

  findUserByToken(token)
    .then(results => {
      res.clearCookie('auth').json({ messge: 'User already logged in', error: true });
    })
    .catch(err => {
      if (err === 'No jwt provided' || err === 'Invalid jwt') {
        const { email, password } = req.body;
        const db = getDb();
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], (err, results) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ message: 'Invalid API usage' });
          }

          if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) {
                console.log(err);
                return res.status(400).send({ message: 'Invalid API usage' });
              }

              if (isMatch) {
                const token = jwt.sign({ id: user.id_text }, SECRET, { expiresIn: expiresInMin * 60 });
                res.cookie('auth', token, { maxAge: expiresInMin * 60 * 1000 }).json({ message: 'User logged in', error: false });
              } else {
                res.status(400).json({ message: 'Invalid credentials', error: true });
              }
            });
          } else {
            res.status(400).json({ message: 'Invalid credentials', error: true });
          }
        });
      } else {
        res.status(400).json({ message: 'Invalid jwt', error: true });
      }
    });
})

users.route('/users/auth').post((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token)
    .then(results => {
      const userObj = results[0];
      res.status(200).json({ message: 'User authenticated', error: false, user: { email: userObj.email, id: userObj.id_text } });
    })
    .catch(err => {
      res.clearCookie('auth').status(400).json({ message: 'Invalid jwt', error: true });
    });
})

users.route('/users/logout').post((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token)
    .then(results => {
      res.clearCookie('auth').json({ message: 'User logged out', error: false });
    })
    .catch(err => {
      res.clearCookie('auth').status(400).json({ message: 'Invalid jwt', error: true });
    });
});

users.route('/users/profile').post((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token).then(results => {
    const db = getDb();

    const sqlNew = `INSERT INTO profile ( userId, firstName, lastName, age, gender, address, state, city, phone, email, batch, last_updated ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
      ON DUPLICATE KEY UPDATE
      firstName = VALUES(firstName),
      lastName = VALUES(lastName),
      age = VALUES(age),
      gender = VALUES(gender),
      address = VALUES(address),
      state = VALUES(state),
      city = VALUES(city),
      phone = VALUES(phone),
      email = VALUES(email),
      batch = VALUES(batch),
      last_updated = VALUES(last_updated)
    `;

    const { firstName, lastName, age, gender, address, state, city, phone, email, batch } = req.body;
    const lastUpdated = new Date().getTime();

    db.query(sqlNew, [results[0].id_text, firstName, lastName, age, gender, address, state, city, phone, email, batch, lastUpdated], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ message: 'Invalid API usage' });
      }
      res.status(200).json({ message: 'Profile updated', error: false });
    });
  }).catch(err => {
    res.status(400).json({ message: `Invalid jwt: ${err}`, error: true });
  });
});

users.route('/users/profile').get((req, res) => {
  const token = req.cookies.auth;

  findUserByToken(token).then(results => {
    const db = getDb();
    const sql = 'SELECT * FROM profile WHERE userId = ?';
    db.query(sql, [results[0].id_text], (err, profileResults) => {
      if (err) throw err;
      if (profileResults.length === 0)
        return res.status(200).json({
          profile: null,
          error: false
        });
      res.status(200).json({ error: false, profile: profileResults[0] });
    });
  }
  ).catch(err => {
    res.status(400).json({ message: `Invalid jwt: ${err}`, error: true });
  });
});

module.exports = users;