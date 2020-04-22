const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
      });
})

router.get('/search',  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({
      username: { "$regex": req.body.username, "$options": "i" } 
    })
    .sort({date: -1})
    .then(users => res.json(users))
    .catch(err => res.status(404).json({noUsersFound: 'No Users found'}));
  }
);

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({$or: [{ username: req.body.username }, {email: req.body.email}]})
      .then(user => {
        if (user) {
          errors.username = 'Username or Email already exists';
          return res.status(400).json(errors);
        } else {
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                    const payload = { id: user.id, handle: user.handle };

                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        res.json({
                        success: true,
                        token: "Bearer " + token
                        });
                    });
                })
                .catch(err => console.log(err));
            })
          })
        }
      })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const username = req.body.username;
    const password = req.body.password;
  
    User.findOne({username})
      .then(user => {
        if (!user) {
          errors.username = 'User not found';
          return res.status(404).json(errors);
        }
  
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
            const payload = {id: user.id, handle: user.handle};

            jwt.sign(
                payload,
                keys.secretOrKey,
                // Tell the key to expire in one hour
                {expiresIn: 3600},
                (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
                });
            } else {
            return res.status(400).json({password: 'Incorrect password'});
            }
        })
    })
})

module.exports = router;