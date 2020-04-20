const Validator = require('validator');
const validText = require('./valid-text');
const validInt = require('./valid-int');
const validBool = require('./valid-bool');
const validArr = require('./valid-arr');


module.exports = function validateCharacterInput(data) {
    let errors = {};
    
    const races = ["Dragonborn", "Dwarf", "Elf", "Half-Elf", "Halfling", "Human", "Gnome", "Tiefling"]
    const klasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]
  
    data.name = validText(data.name) ? data.name : '';
    data.race = validText(data.race) ? data.race : '';
    data.klass = validText(data.klass) ? data.klass : '';
    data.hitPoints = validInt(data.hitPoints) ? data.hitPoints : 0; 
    data.armorClass = validInt(data.armorClass) ? data.armorClass : 0;
    data.str = validInt(data.str) ? data.str : 0; 
    data.dex = validInt(data.dex) ? data.dex : 0;
    data.con = validInt(data.con) ? data.con : 0;
    data.int = validInt(data.int) ? data.int : 0;
    data.wis = validInt(data.wis) ? data.wis : 0;
    data.cha = validInt(data.cha) ? data.cha : 0;
    data.lvl = validInt(data.lvl) ? data.lvl : 0;
    data.allowMagic = validBool(data.allowMagic) ? data.allowMagic : false;
    data.proficiencies = validArr(data.proficiencies) ? data.proficiencies : [];
  
    if (!Validator.isLength(data.name, { min: 2, max: 35 })) {
      errors.name = 'Name must be between 2 and 35 characters';
    }
  
    if (Validator.isEmpty(data.name)) {
      errors.name = 'Name is required';
    }

    if (!Validator.isIn(data.race, races)) {
        errors.race = 'Not a valid race';
    }
    
    if (Validator.isEmpty(data.race)) {
        errors.race = 'Must choose a Race';
    }

    if (!Validator.isIn(data.klass, klasses)) {
        errors.klass = 'Not a valid class';
    }
    
    if (Validator.isEmpty(data.klass)) {
        errors.klass = 'Must choose a Class';
    }

    if(data.hitPoints <= 0 || data.hitPoints > 500){
        errors.text = 'Hit points must be between 1 and 500';
    }

    if(data.armorClass <= 0 || data.armorClass > 30){
        errors.armorClass = 'Armor class must be between 1 and 30';
    }
    
    if(data.str <= 0 || data.str > 30){
        errors.str = 'Strength must be between 1 and 30';
    }

    if(data.dex <= 0 || data.dex > 30){
        errors.dex = 'Dexterity must be between 1 and 30';
    }

    if(data.con <= 0 || data.con > 30){
        errors.con = 'Constitution must be between 1 and 30';
    }

    if(data.int <= 0 || data.int > 30){
        errors.int = 'Intelligence must be between 1 and 30';
    }

    if(data.wis <= 0 || data.wis > 30){
        errors.wis = 'Wisdom must be between 1 and 30';
    }

    if(data.cha <= 0 || data.cha > 30){
        errors.cha = 'Charisma must be between 1 and 30';
    }
    if(data.lvl <= 0 || data.lvl > 20){
        errors.lvl = 'Level must be between 1 and 20';
    }

    if(data.proficiencies.length != 3){
        errors.proficiencies = 'You need to have three proficiencies';
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  };