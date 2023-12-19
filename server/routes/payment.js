const express = require('express');
const payments = express.Router();
const { findUserByToken } = require('../helpers/helper');

const getDb = require('../db/conn').getDb;

payments.route('/payments/pay').post((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token).then(results => {
    const userId = results[0].id_text;
    // handle payment


    // store payment in database
    const db = getDb();
    const insertQuery = "INSERT INTO payments (userId, transactionId, amount, paymentDate, status) VALUES (?, ?, ?, ?, ?)";
    const paymentDate = new Date().getTime();
    const transactionId = `${userId}-${paymentDate}`;
    const amount = req.body.amount || 500;
    const status = 'success';

    db.query(insertQuery, [userId, transactionId, amount, paymentDate, status], (err, result) => {
      if (err) throw err;
      console.log(result);

      res.status(200).json({
        success: true,
        message: 'Payment successful'
      });
    });
  })
    .catch(err => {
      res.status(401).json({ success: false, message: 'Unauthorized payment' })
    })
})

payments.route('/payments/history').get((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token).then(results => {
    const userId = results[0].id_text;
    const db = getDb();
    const query = "SELECT * FROM payments WHERE userId = ?";
    db.query(query, [userId], (err, results) => {
      if (err) throw err;
      console.log(results);
      res.status(200).json({ success: true, payments: results });
    })
  })
    .catch(err => {
      res.status(401).json({ success: false, message: 'Unauthorized payment' })
    })
})

module.exports = payments;