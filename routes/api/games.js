const express = require('express');
const router = express.Router();
const passport = require('passport');
const Game = require('../../models/Game');
const validateGameInput = require('../../validation/games');

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateGameInput(req.body);
        
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newGame = new Game({
        dm: req.user.id,
        monsters: req.body.monsters,
        players: req.body.players,
        title: req.body.title,
        turns: 0,
      });
  
      newGame.save().then(game => res.json(game));
    }
);

router.get('/dm',  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Game.find({dm: req.user.id})
    .sort({date: -1})
    .then(games => res.json(games))
    .catch(err => res.status(404).json({noGamesFound: "No Games dm'd found"}));
  }
);

router.get('/search',  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Game.find({
      title: { "$regex": req.body.title, "$options": "i" } 
    })
    .sort({date: -1})
    .then(games => res.json(games))
    .catch(err => res.status(404).json({noGamesFound: 'No Games found'}));
  }
);

router.get('/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Game.findById(req.params.id)
      .then(game => res.json(game))
      .catch( err => res.status(404).json({noGameFound: 'No Game found with that id'}))
  }
);

router.patch('/edit/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {

      const { errors, isValid } = validateGameInput(req.body);
        
      if (!isValid) {
        return res.status(400).json(errors);
      }
      Game.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
      .then(game => res.json(game))
      .catch( err => res.status(404).json({noGameFound: 'No Game found with that id'}))
  }
);

router.post('/addPlayer/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
 
      Game.findById(req.params.id)
      .then(game => {
        game.players.push({
            id: req.body.id,
            hp: req.body.hp,
            initiative: req.body.initiative,
        });
        return game.save();
      } )
      .then(game => res.json(game))
      .catch( err => res.status(404).json( err ? err : {noGameFound: 'No Game found with that id'}))
  }
);

router.post('/addMonster/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
 
      Game.findById(req.params.id)
      .then(game => {
        game.monsters.push({
            name: req.body.name,
            hp: req.body.hp,
            initiative: req.body.initiative,
        });
        return game.save();
      } )
      .then(game => res.json(game))
      .catch( err => res.status(404).json( err ? err : {noGameFound: 'No Game found with that id'}))
  }
);

router.patch('/playturn/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {

      const { errors, isValid } = validateGameInput(req.body);
        
      if (!isValid) {
        return res.status(400).json(errors);
      }
      Game.findById(req.params.id)
      .then(game => {
        game.title = game.title;
        game.turns = game.turns + 1;
        game.players = req.body.players;
        game.monsters = req.body.monsters;
        game.turnId = req.body.turnId;
        return game.save();
      } )
      .then(game => res.json(game))
      .catch( err => res.status(404).json({noGameFound: 'No Game found with that id'}))
  }
);

router.delete('/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Game.findByIdAndRemove(req.params.id)
      .then( () => res.json({gameDeleted: 'Game Deleted'}))
      .catch( err => res.status(404).json({noGameFound: 'No Game found with that id'}))
  }
);

module.exports = router;