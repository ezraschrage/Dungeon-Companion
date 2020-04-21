const express = require('express');
const router = express.Router();
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

router.get('/',  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Character.find({user: req.user.id})
    .sort({date: -1})
    .then(characters => res.json(characters))
    .catch(err => res.status(404).json({noCharactersFound: 'No Characters found'}));
  }
);

router.get('/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Character.findById(req.params.id)
      .then(character => res.json(character))
      .catch( err => res.status(404).json({noCharacterFound: 'No Character found with that id'}))
  }
);

router.get('/search',  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Character.find({
      name: { "$regex": req.body.name, "$options": "i" } 
    })
    .sort({date: -1})
    .then(characters => res.json(characters))
    .catch(err => res.status(404).json({noCharactersFound: 'No Characters found'}));
  }
);

router.patch('/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {

      const { errors, isValid } = validateCharacterInput(req.body);
        
      if (!isValid) {
        return res.status(400).json(errors);
      }
      Character.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
      .then(character => res.json(character))
      .catch( err => res.status(404).json({noCharacterFound: 'No Character found with that id'}))
  }
);

router.delete('/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Character.findByIdAndRemove(req.params.id)
      .then( () => res.json({characterDeleted: 'Character Deleted'}))
      .catch( err => res.status(404).json({noCharacterFound: 'No Character found with that id'}))
  }
);



module.exports = router;