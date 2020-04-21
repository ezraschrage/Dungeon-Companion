const Validator = require('validator');
const validText = require('./valid-text');
const validArr = require('./valid-arr');


module.exports = function validateGameInput(data) {
    let errors = {}; 
   
    data.monsters = validArr(data.monsters) ? data.monsters : [];
    data.players = validArr(data.players) ? data.players : [];
    data.title = validText(data.title) ? data.title: '';
    
    if (!Validator.isLength(data.title, { min: 2, max: 35 })) {
      errors.title = 'Title must be between 2 and 35 characters';
    }
  
    if (Validator.isEmpty(data.title)) {
      errors.title = 'Title is required';
    }

    for (let i = 0; i < data.monsters.length; i++) {
        if(!data.monsters[i].id){
            errors.monsterId = "A monster's id is required"
        }
        if(!data.monsters[i].hp){
            errors.monsterHp = "A monster's Hp is required"
        }
        if(!data.monsters[i].initiative){
            errors.monsterInt = "A monster's initiative is required"
        } 
    }

    for (let i = 0; i < data.players.length; i++) {
        if(!data.players[i].id){
            errors.playerId = "A player's id is required"
        }
        if(!data.players[i].hp){
            errors.playerHp = "A player's Hp is required"
        }
        if(!data.players[i].initiative){
            errors.playerInt = "A player's initiative is required"
        } 
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  };