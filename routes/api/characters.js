const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Character = require('../../models/Character');
const validateCharacterInput = require('../../validation/characters');

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateCharacterInput(req.body);
        
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newCharacter = new Character({
        user: req.user.id,
        name: req.body.name,
        klass: req.body.klass,
        race: req.body.race,
        hitPoints: req.body.hitPoints,
        armorClass: req.body.armorClass,
        str: req.body.str,
        dex: req.body.dex,
        con: req.body.con,
        int: req.body.int,
        wis: req.body.wis,
        cha: req.body.cha,
        lvl: req.body.lvl,
        allowMagic: req.body.allowMagic,
        proficiencies: req.body.proficiencies,
      });
  
      newCharacter.save().then(character => res.json(character));
    }
  );

  module.exports = router;